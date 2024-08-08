package kr.momo.fixture;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.Meeting;

public enum ConfirmedMeetingFixture {

    MOVIE(
            LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(0, 0)),
            LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.of(5, 30))
    );

    private final LocalDateTime startDateTime;
    private final LocalDateTime endDateTime;

    ConfirmedMeetingFixture(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public ConfirmedMeeting create(Meeting meeting) {
        return new ConfirmedMeeting(meeting, startDateTime, endDateTime);
    }
}
