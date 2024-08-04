package kr.momo.service.confirmschedule;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalDateTime;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.confirmedschedule.ConfirmedSchedule;
import kr.momo.domain.confirmedschedule.ConfirmedScheduleRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.ConfirmedScheduleErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.exception.code.ScheduleErrorCode;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.schedule.dto.ScheduleConfirmRequest;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class ConfirmScheduleServiceTest {

    @Autowired
    private ConfirmScheduleService confirmSchedule;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ConfirmedScheduleRepository confirmedScheduleRepository;

    private Meeting meeting;
    private Attendee attendee;
    private AvailableDate today;
    private ScheduleConfirmRequest validRequest;

    @BeforeEach
    void setUp() {
        meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        validRequest = new ScheduleConfirmRequest(
                LocalDateTime.of(today.getDate(), Timeslot.TIME_0100.getLocalTime()),
                LocalDateTime.of(today.getDate(), Timeslot.TIME_0130.getLocalTime())
        );
    }

    @DisplayName("주최자가 잠겨있는 약속의 일정을 확정한다.")
    @Test
    void confirmSchedule() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0100));
        meeting.lock();
        meetingRepository.save(meeting);

        confirmSchedule.create(meeting.getUuid(), attendee.getId(), validRequest);

        ConfirmedSchedule confirmedSchedule = confirmedScheduleRepository.findByMeeting(meeting).get();
        LocalDateTime startDateTime = confirmedSchedule.getStartDateTime();
        LocalDateTime endDateTime = confirmedSchedule.getEndDateTime();
        assertAll(
                () -> assertThat(startDateTime).isEqualTo(validRequest.startDateTime()),
                () -> assertThat(endDateTime).isEqualTo(validRequest.endDateTime())
        );
    }

    @DisplayName("주최자가 잠겨있는 약속 일정을 확정할 때, UUID가 유효하지 않으면 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidMeeting() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0100));
        meeting.lock();
        meetingRepository.save(meeting);

        String invalidUuid = "invalidUuid";
        assertThatThrownBy(() -> confirmSchedule.create(invalidUuid, attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }

    @DisplayName("존재하지 않은 참가자가 잠겨있는 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidAttendee() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0100));
        meeting.lock();
        meetingRepository.save(meeting);

        long InvalidAttendeeId = 9999L;
        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), InvalidAttendeeId, validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_ATTENDEE.message());
    }

    @DisplayName("주최자가 아닌 참가자가 잠겨있는 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_NoHost() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0100));
        meeting.lock();
        meetingRepository.save(meeting);
        Attendee guest = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));

        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), guest.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.ACCESS_DENIED.message());
    }

    @DisplayName("잠겨있지 않은 약속 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_Unlock() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0130));

        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.MEETING_UNLOCKED.message());
    }

    @DisplayName("이미 약속이 확정되었을 때 약속 일정을 확정할 때 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_AlreadyConfirmed() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0100));
        meeting.lock();
        meetingRepository.save(meeting);
        confirmSchedule.create(meeting.getUuid(), attendee.getId(), validRequest);

        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), attendee.getId(), validRequest))
                .isInstanceOf(MomoException.class)
                .hasMessage(ConfirmedScheduleErrorCode.ALREADY_EXIST_CONFIRMED_SCHEDULE.message());
    }

    @DisplayName("약속에 존재하지 않는 날짜로 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidDate() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0130));
        meeting.lock();
        meetingRepository.save(meeting);
        LocalDate invalidDate = LocalDate.now().plusDays(30);
        ScheduleConfirmRequest request = new ScheduleConfirmRequest(
                LocalDateTime.of(invalidDate, Timeslot.TIME_0100.getLocalTime()),
                LocalDateTime.of(invalidDate, Timeslot.TIME_0130.getLocalTime())
        );

        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), attendee.getId(), request))
                .isInstanceOf(MomoException.class)
                .hasMessage(ConfirmedScheduleErrorCode.INVALID_DATETIME_RANGE.message());
    }

    @DisplayName("약속에 포함되지 않은 시간의 일정을 확정 시 예외가 발생한다.")
    @Test
    void confirmScheduleThrowsExceptionWhen_InvalidTime() {
        scheduleRepository.save(new Schedule(attendee, today, Timeslot.TIME_0130));
        meeting.lock();
        meetingRepository.save(meeting);
        ScheduleConfirmRequest request = new ScheduleConfirmRequest(
                LocalDateTime.of(today.getDate(), Timeslot.TIME_2200.getLocalTime()),
                LocalDateTime.of(today.getDate(), Timeslot.TIME_2300.getLocalTime())
        );

        assertThatThrownBy(() -> confirmSchedule.create(meeting.getUuid(), attendee.getId(), request))
                .isInstanceOf(MomoException.class)
                .hasMessage(ScheduleErrorCode.INVALID_SCHEDULE_TIMESLOT.message());
    }
}
