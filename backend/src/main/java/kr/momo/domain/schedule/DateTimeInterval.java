package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
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
