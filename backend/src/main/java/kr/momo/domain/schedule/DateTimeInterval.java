package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class DateTimeInterval implements RecommendInterval {

    private final LocalDateTime startDateTime;
    private final LocalDateTime endDateTime;

    @Override
    public boolean isSequential(RecommendInterval nextInterval) {
        return endDateTime.equals(nextInterval.startDateTime());
    }

    @Override
    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }

    @Override
    public LocalDateTime startDateTime() {
        return startDateTime;
    }

    @Override
    public LocalDateTime endDateTime() {
        return endDateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DateTimeInterval that = (DateTimeInterval) o;
        return Objects.equals(startDateTime, that.startDateTime) && Objects.equals(endDateTime,
                that.endDateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startDateTime, endDateTime);
    }
}
