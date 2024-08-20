package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import kr.momo.domain.attendee.AttendeeGroup;

public record CandidateSchedule(
        DateTimeInterval dateTimeInterval, AttendeeGroup attendeeGroup
) {

    public static CandidateSchedule of(
            LocalDateTime startDateTime, LocalDateTime endDateTime, AttendeeGroup attendeeGroup
    ) {
        return new CandidateSchedule(new DateTimeInterval(startDateTime, endDateTime), attendeeGroup);
    }

    public LocalDateTime startDateTime() {
        return dateTimeInterval.startDateTime();
    }

    public LocalDateTime endDateTime() {
        return dateTimeInterval.endDateTime();
    }

    public Duration duration() {
        return dateTimeInterval.duration();
    }

    public int groupSize() {
        return attendeeGroup.size();
    }
}
