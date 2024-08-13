package kr.momo.domain.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ConfirmedMeetingTest {

    @DisplayName("확정된 약속의 범위에 포함되는 스케줄들 중 참석 가능한 참석자들을 반환한다.")
    @Test
    void availableAttendeesOf() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        Attendee attendee1 = AttendeeFixture.GUEST_MARK.create(meeting);
        Attendee attendee2 = AttendeeFixture.HOST_JAZZ.create(meeting);
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

        List<Attendee> attendees = confirmedMeeting.availableAttendeesOf(schedules);

        assertAll(
                () -> assertThat(attendees).hasSize(1),
                () -> assertThat(attendees).containsExactly(attendee1)
        );
    }
}
