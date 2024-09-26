package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateInterval extends DateTimeInterval {

    public DateInterval(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        super(startDateTime, endDateTime);
    }

    @Override
    public boolean isSequential(DateTimeInterval nextInterval) {
        LocalDate currentEndDate = endDateTime().toLocalDate();
        LocalDate nextStartDate = nextInterval.startDateTime().toLocalDate();
        return currentEndDate.plusDays(1).equals(nextStartDate);
    }

    @Override
    public Duration duration() {
        LocalDate startDate = startDateTime().toLocalDate();
        LocalDate endDate = endDateTime().toLocalDate();
        return Duration.between(startDate, endDate);
    }
}
