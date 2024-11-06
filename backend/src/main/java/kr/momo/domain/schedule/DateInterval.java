package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public record DateInterval(LocalDate startDate, LocalDate endDate) implements RecommendInterval {

    @Override
    public boolean isSequential(RecommendInterval nextInterval) {
        LocalDate nextStartDate = nextInterval.startDateTime().toLocalDate();
        return endDate.plusDays(1).equals(nextStartDate);
    }

    @Override
    public Duration duration() {
        return Duration.between(startDate, endDate);
    }

    @Override
    public LocalDateTime startDateTime() {
        return startDate.atStartOfDay();
    }

    @Override
    public LocalDateTime endDateTime() {
        return endDate.atStartOfDay();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DateInterval that = (DateInterval) o;
        return Objects.equals(startDate, that.startDate) && Objects.equals(endDate, that.endDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startDate, endDate);
    }
}
