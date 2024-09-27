package kr.momo.service.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.ConfirmedMeetingRepository;
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
import kr.momo.service.meeting.dto.ConfirmedMeetingResponse;
import kr.momo.service.meeting.dto.MeetingConfirmRequest;
import kr.momo.service.meeting.dto.MeetingConfirmResponse;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class MeetingConfirmServiceTest {

    @Autowired
    private MeetingConfirmService meetingConfirmService;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ConfirmedMeetingRepository confirmedMeetingRepository;

    private Meeting meeting;
    private Attendee attendee;
    private AvailableDate today;
    private MeetingConfirmRequest validRequest;

    @BeforeEach
    void setUp() {
        meeting = MeetingFixture.MOVIE.create();
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        validRequest = new MeetingConfirmRequest(
                today.getDate(),
                meeting.earliestTime(),
                today.getDate(),
                meeting.earliestTime().plusMinutes(90)
        );
    }

    @DisplayName("주최자가 잠겨있는 약속의 일정을 확정한다.")
    @Test
    void confirmSchedule() {
        meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest);

        ConfirmedMeeting confirmedMeeting = confirmedMeetingRepository.findByMeeting(meeting).get();
        LocalDateTime startDateTime = confirmedMeeting.getStartDateTime();
        LocalDateTime endDateTime = confirmedMeeting.getEndDateTime();
        assertAll(
                () -> assertThat(startDateTime).isEqualTo(validRequest.toStartDateTime()),
                () -> assertThat(endDateTime).isEqualTo(validRequest.toEndDateTime())
        );
    }

    @DisplayName("주최자가 잠겨있는 약속 일정을 확정할 때, UUID가 유효하지 않으면 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidMeeting() {
        String invalidUuid = "invalidUuid";
        assertThatThrownBy(() -> meetingConfirmService.create(invalidUuid, attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }

    @DisplayName("존재하지 않은 참가자가 잠겨있는 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidAttendee() {
        long invalidAttendeeId = 9999L;
        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), invalidAttendeeId, validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_ATTENDEE.message());
    }

    @DisplayName("주최자가 아닌 참가자가 잠겨있는 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_NoHost() {
        Attendee guest = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));

        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), guest.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.ACCESS_DENIED.message());
    }

    @DisplayName("잠겨있지 않은 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_Unlock() {
        meeting.unlock();
        meetingRepository.save(meeting);

        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.MEETING_UNLOCKED.message());
    }

    @DisplayName("이미 약속이 확정되었을 때 약속 일정을 확정할 때 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_AlreadyConfirmed() {
        meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest);

        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.ALREADY_CONFIRMED.message());
    }

    @DisplayName("약속에 존재하지 않는 날짜로 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidDate() {
        LocalDate invalidDate = LocalDate.now().plusDays(30);
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                invalidDate,
                Timeslot.TIME_0100.startTime(),
                invalidDate,
                Timeslot.TIME_0130.startTime()
        );

        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), attendee.getId(), request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_DATETIME_RANGE.message());
    }

    @DisplayName("약속에 포함되지 않은 시간의 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidTime() {
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                today.getDate(),
                Timeslot.TIME_2200.startTime(),
                today.getDate(),
                Timeslot.TIME_2300.startTime()
        );

        assertThatThrownBy(() -> meetingConfirmService.create(meeting.getUuid(), attendee.getId(), request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_DATETIME_RANGE.message());
    }

    @DisplayName("주최자가 확정된 약속을 취소하면 확정된 약속이 삭제되고 약속은 잠금 해제 된다.")
    @Test
    void cancelConfirmSchedule() {
        meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest);

        meetingConfirmService.delete(meeting.getUuid(), attendee.getId());

        meeting = meetingRepository.findByUuid(meeting.getUuid()).get();
        assertAll(
                () -> assertThat(confirmedMeetingRepository.findByMeeting(meeting)).isEmpty(),
                () -> assertThat(meeting.isLocked()).isFalse()
        );
    }

    @DisplayName("주최자가 아닌 참여자가 확정된 약속을 취소하면 예외가 발생한다.")
    @Test
    void cancelConfirmScheduleNotHost() {
        meetingConfirmService.create(meeting.getUuid(), attendee.getId(), validRequest);
        Attendee guest = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));

        assertThatThrownBy(() -> meetingConfirmService.delete(meeting.getUuid(), guest.getId()))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.ACCESS_DENIED.message());
    }

    @DisplayName("확정 약속을 조회한다.")
    @Test
    void findByUuid() {
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0000));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0030));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0100));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0130));
        Attendee attendee2 = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));
        schedules.add(new Schedule(attendee2, today, Timeslot.TIME_0000));
        schedules.add(new Schedule(attendee2, today, Timeslot.TIME_0100));
        scheduleRepository.saveAll(schedules);
        validRequest = new MeetingConfirmRequest(
                today.getDate(),
                LocalTime.of(0, 0),
                today.getDate(),
                LocalTime.of(1, 30)
        );

        MeetingConfirmResponse confirmed = meetingConfirmService.create(meeting.getUuid(), attendee.getId(),
                validRequest);
        ConfirmedMeetingResponse response = meetingConfirmService.findByUuid(meeting.getUuid());

        assertAll(
                () -> assertThat(response.meetingName()).isEqualTo(meeting.getName()),
                () -> assertThat(response.availableAttendeeNames()).containsExactlyInAnyOrder(attendee.name()),
                () -> assertThat(response.startDate()).isEqualTo(confirmed.startDate()),
                () -> assertThat(response.startTime()).isEqualTo(confirmed.startTime()),
                () -> assertThat(response.startDayOfWeek())
                        .isEqualTo(
                                confirmed.startDate().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN)),
                () -> assertThat(response.endDate()).isEqualTo(confirmed.endDate()),
                () -> assertThat(response.endTime()).isEqualTo(confirmed.endTime()),
                () -> assertThat(response.endDayOfWeek())
                        .isEqualTo(confirmed.endDate().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN)),
                () -> assertThat(response.type()).isEqualTo(meeting.getType().name())
        );
    }

    @DisplayName("확정되지 않은 확정 약속을 조회하면 예외가 발생한다.")
    @Test
    void findByUuidNotConfirmed() {
        assertThatThrownBy(() -> meetingConfirmService.findByUuid(meeting.getUuid()))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.NOT_CONFIRMED.message());
    }
}
