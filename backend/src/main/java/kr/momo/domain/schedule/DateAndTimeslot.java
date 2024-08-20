package kr.momo.domain.schedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import kr.momo.domain.timeslot.Timeslot;

public record DateAndTimeslot(LocalDate date, Timeslot timeslot) {

    public DateTimeInterval toDateTimeInterval() {
        LocalDate endDate = timeslot.isLast() ? date.plusDays(1) : date;
        return new DateTimeInterval(
                LocalDateTime.of(date, timeslot.startTime()), LocalDateTime.of(endDate, timeslot.endTime())
        );
    }
}
