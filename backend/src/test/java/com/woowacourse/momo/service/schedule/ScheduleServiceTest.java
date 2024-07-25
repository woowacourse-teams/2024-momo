package com.woowacourse.momo.service.schedule;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.schedule.dto.DateTimesCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleOneAttendeeDateTimesResponse;
import com.woowacourse.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import com.woowacourse.momo.support.IsolateDatabase;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
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

    @DisplayName("스케줄 생성 요청의 UUID가 존재하지 않으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionWhenInvalidUUID() {
        Meeting other = MeetingFixture.DINNER.create();
        String uuid = other.getUuid();
        ScheduleCreateRequest request = new ScheduleCreateRequest(attendee.name(), dateTimes);

        assertThatThrownBy(() -> scheduleService.create(uuid, request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }

    @DisplayName("약속에 참가자 정보가 존재하지 않으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionWhenInvalidAttendee() {
        String invalidAttendee = "invalidAttendee";
        String uuid = meeting.getUuid();
        ScheduleCreateRequest request = new ScheduleCreateRequest(invalidAttendee, dateTimes);

        assertThatThrownBy(() -> scheduleService.create(uuid, request))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_ATTENDEE.message());
    }

    @DisplayName("스케줄 생성 시 사용자의 기존 스케줄들을 모두 삭제하고 새로운 스케줄을 저장한다.")
    @Test
    void createSchedulesReplacesOldSchedules() {
        ScheduleCreateRequest request = new ScheduleCreateRequest(attendee.name(), dateTimes);
        scheduleRepository.saveAll(List.of(
                new Schedule(attendee, today, Timeslot.TIME_0130),
                new Schedule(attendee, tomorrow, Timeslot.TIME_0130)
        ));

        scheduleService.create(meeting.getUuid(), request);
        long scheduleCount = scheduleRepository.count();

        assertThat(scheduleCount).isEqualTo(4);
    }

    @DisplayName("참가자 이름과 약속 UUID로 스케줄을 조회한다.")
    @Test
    void findSingleSchedule() {
        setOneAttendeeSchedule();

        ScheduleOneAttendeeResponse result = scheduleService.findSingleSchedule(meeting.getUuid(), attendee.name());
        ScheduleOneAttendeeDateTimesResponse firstTimeResponse = result.dateTimes().get(0);

        assertAll(
                () -> assertThat(result.attendeeName()).isEqualTo(attendee.name()),
                () -> assertThat(result.dateTimes()).hasSize(2),
                () -> assertThat(firstTimeResponse.times()).hasSize(3)
        );
    }

    @DisplayName("참가자 스케줄시 약속이 존재하지 않으면 예외가 발생한다.")
    @Test
    void throwsIfNoAppointmentInParticipantSchedule() {
        setOneAttendeeSchedule();
        String givenUUID = "1234";
        String name = attendee.name();

        assertThatThrownBy(() -> scheduleService.findSingleSchedule(givenUUID, name))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.NOT_FOUND_MEETING.message());
    }

    @DisplayName("참가자 스케줄시 참가자가 존재하지 않으면 예외가 발생한다.")
    @Test
    void throwsIfNoAttendeeInParticipantSchedule() {
        setOneAttendeeSchedule();
        String uuid = meeting.getUuid();
        String givenAttendeeName = "NOTHING";

        assertThatThrownBy(() -> scheduleService.findSingleSchedule(uuid, givenAttendeeName))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_ATTENDEE.message());
    }

    private void setOneAttendeeSchedule() {
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
