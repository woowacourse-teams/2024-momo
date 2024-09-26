package kr.momo.domain.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class ConfirmedMeetingTest {

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @DisplayName("확정된 약속의 범위에 포함되는 스케줄들 중 참석 가능한 참석자들을 반환한다.")
    @Test
    void availableAttendeesOf() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        Attendee attendee1 = AttendeeFixture.GUEST_MARK.create(meeting, passwordEncoder);
        Attendee attendee2 = AttendeeFixture.HOST_JAZZ.create(meeting, passwordEncoder);
        LocalDate today = LocalDate.now();
        ConfirmedMeeting confirmedMeeting = new ConfirmedMeeting(
                meeting
                , LocalDateTime.of(today, LocalTime.of(0, 0))
                , LocalDateTime.of(today, LocalTime.of(1, 0))
        );
        List<Schedule> schedules = List.of(
                new Schedule(attendee1, new AvailableDate(today, meeting), Timeslot.TIME_0000),
                new Schedule(attendee1, new AvailableDate(today, meeting), Timeslot.TIME_0030),
                new Schedule(attendee1, new AvailableDate(today, meeting), Timeslot.TIME_0100),
                new Schedule(attendee2, new AvailableDate(today, meeting), Timeslot.TIME_0000)
        );

        AttendeeGroup availableAttendees = confirmedMeeting.availableAttendeesOf(schedules);
        List<Attendee> attendees = availableAttendees.getAttendees();

        assertAll(
                () -> assertThat(attendees).hasSize(1),
                () -> assertThat(attendees).containsExactly(attendee1)
        );
    }
}
