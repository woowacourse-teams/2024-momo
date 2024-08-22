package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;

public record DateTimeInterval(LocalDateTime startDateTime, LocalDateTime endDateTime) {

    public boolean isSequential(DateTimeInterval nextInterval) {
        return endDateTime.equals(nextInterval.startDateTime);
    }

    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }
}
