package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;

public record DateTimeInterval(LocalDateTime startDateTime, LocalDateTime endDateTime) implements RecommendInterval {

    @Override
    public boolean isSequential(RecommendInterval nextInterval) {
        return endDateTime.equals(nextInterval.startDateTime());
    }

    @Override
    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }
}
