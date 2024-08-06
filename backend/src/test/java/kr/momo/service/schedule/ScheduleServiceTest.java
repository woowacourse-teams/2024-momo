package kr.momo.service.schedule;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.schedule.dto.AttendeesScheduleResponse;
import kr.momo.service.schedule.dto.DateTimesCreateRequest;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.ScheduleDateTimesResponse;
import kr.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import kr.momo.service.schedule.dto.SchedulesResponse;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class ScheduleServiceTest {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    private Meeting meeting;
    private Attendee attendee;
    private AvailableDate today;
    private AvailableDate tomorrow;
    private List<DateTimesCreateRequest> dateTimes;

    @BeforeEach
    void setUp() {
        meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));

        List<LocalTime> times = List.of(Timeslot.TIME_0100.getLocalTime(), Timeslot.TIME_0130.getLocalTime());

        dateTimes = List.of(
                new DateTimesCreateRequest(today.getDate(), times),
                new DateTimesCreateRequest(tomorrow.getDate(), times)
        );
    }

    @DisplayName("스케줄 생성 시 사용자의 기존 스케줄들을 모두 삭제하고 새로운 스케줄을 저장한다.")
    @Test
    void createSchedulesReplacesOldSchedules() {
        ScheduleCreateRequest request = new ScheduleCreateRequest(dateTimes);
        scheduleRepository.saveAll(List.of(
                new Schedule(attendee, today, Timeslot.TIME_0130),
                new Schedule(attendee, tomorrow, Timeslot.TIME_0130)
        ));

        scheduleService.create(meeting.getUuid(), attendee.getId(), request);
        long scheduleCount = scheduleRepository.count();

        assertThat(scheduleCount).isEqualTo(4);
    }

    @DisplayName("스케줄 생성 요청의 UUID가 존재하지 않으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionWhenInvalidUUID() {
        Meeting other = MeetingFixture.DINNER.create();
        String invalidUUID = other.getUuid();
        long attendeeId = attendee.getId();
        ScheduleCreateRequest request = new ScheduleCreateRequest(dateTimes);

        assertThatThrownBy(() -> scheduleService.create(invalidUUID, attendeeId, request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }

    @DisplayName("스케줄 생성시 약속이 잠겨있다면 예외를 발생시킨다.")
    @Test
    void throwsExceptionWhenMeetingLocked() {
        Meeting game = MeetingFixture.GAME.create();
        game.lock();
        Meeting lockedMeeting = meetingRepository.save(game);
        ScheduleCreateRequest request = new ScheduleCreateRequest(dateTimes);
        String givenUUID = lockedMeeting.getUuid();
        Long givenAttendeeId = attendee.getId();

        assertThatThrownBy(() -> scheduleService.create(givenUUID, givenAttendeeId, request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.MEETING_LOCKED.message());
    }

    /* dummy data table
     *         today     tomorrow
     * 01:00   baeky     name
     *         name
     *
     * 01:30   baeky
     */
    @DisplayName("해당하는 UUID의 미팅에 속한 참가자들의 모든 스케줄을 조회한다.")
    @Test
    void findAllSchedulesInMeetingByUuid() {
        Attendee attendee2 = attendeeRepository.save(AttendeeFixture.GUEST_BAKEY.create(meeting));
        Schedule schedule1 = new Schedule(attendee, today, Timeslot.TIME_0100);
        Schedule schedule2 = new Schedule(attendee, tomorrow, Timeslot.TIME_0100);
        Schedule schedule3 = new Schedule(attendee2, today, Timeslot.TIME_0100);
        Schedule schedule4 = new Schedule(attendee2, today, Timeslot.TIME_0130);
        scheduleRepository.saveAll(List.of(schedule1, schedule2, schedule3, schedule4));

        SchedulesResponse response = scheduleService.findAllSchedules(meeting.getUuid());

        assertThat(response.schedules()).containsExactlyInAnyOrder(
                new AttendeesScheduleResponse(
                        today.getDate(),
                        Timeslot.TIME_0100.getLocalTime(),
                        List.of(attendee.name(), attendee2.name())),
                new AttendeesScheduleResponse(
                        today.getDate(),
                        Timeslot.TIME_0130.getLocalTime(),
                        List.of(attendee2.name())),
                new AttendeesScheduleResponse(
                        tomorrow.getDate(),
                        Timeslot.TIME_0100.getLocalTime(),
                        List.of(attendee.name()))
        );
    }

    @DisplayName("참가자 이름과 약속 UUID로 스케줄을 조회한다.")
    @Test
    void findSingleSchedule() {
        createAttendeeSchedule(attendee);

        ScheduleOneAttendeeResponse result = scheduleService.findSingleSchedule(meeting.getUuid(), attendee.name());
        ScheduleDateTimesResponse firstTimeResponse = result.schedules().get(0);

        assertAll(
                () -> assertThat(result.attendeeName()).isEqualTo(attendee.name()),
                () -> assertThat(result.schedules()).hasSize(2),
                () -> assertThat(firstTimeResponse.times()).hasSize(3)
        );
    }

    @DisplayName("참가자 스케줄시 약속이 존재하지 않으면 예외가 발생한다.")
    @Test
    void throwsIfNoAppointmentInParticipantSchedule() {
        createAttendeeSchedule(attendee);
        String givenUUID = "1234";
        String name = attendee.name();

        assertThatThrownBy(() -> scheduleService.findSingleSchedule(givenUUID, name))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.NOT_FOUND_MEETING.message());
    }

    @DisplayName("참가자 스케줄시 참가자가 존재하지 않으면 예외가 발생한다.")
    @Test
    void throwsIfNoAttendeeInParticipantSchedule() {
        createAttendeeSchedule(attendee);
        String uuid = meeting.getUuid();
        String givenAttendeeName = "NOTHING";

        assertThatThrownBy(() -> scheduleService.findSingleSchedule(uuid, givenAttendeeName))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.NOT_FOUND_ATTENDEE.message());
    }

    @DisplayName("UUID와 참가자 ID로 자신의 스케줄을 조회한다.")
    @Test
    void findMySchedule() {
        createAttendeeSchedule(attendee);

        ScheduleOneAttendeeResponse result = scheduleService.findMySchedule(meeting.getUuid(), attendee.getId());
        ScheduleDateTimesResponse firstTimeResponse = result.schedules().get(0);

        assertAll(
                () -> assertThat(result.attendeeName()).isEqualTo(attendee.name()),
                () -> assertThat(result.schedules()).hasSize(2),
                () -> assertThat(firstTimeResponse.times()).hasSize(3)
        );
    }

    private void createAttendeeSchedule(Attendee attendee) {
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0300));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0400));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0500));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1600));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1700));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1300));
        scheduleRepository.saveAll(schedules);
    }
}
