package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DateTimeInterval {

    private final LocalDateTime startDateTime;
    private final LocalDateTime endDateTime;

    public boolean isSequential(DateTimeInterval nextInterval) {
        return endDateTime.equals(nextInterval.startDateTime);
    }

    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }

    public LocalDateTime startDateTime() {
        return startDateTime;
    }

    public LocalDateTime endDateTime() {
        return endDateTime;
    }
}
