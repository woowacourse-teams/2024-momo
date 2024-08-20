package kr.momo.domain.schedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import kr.momo.domain.timeslot.Timeslot;

public record DateAndTimeslot(LocalDate date, Timeslot timeslot) {

    public DateTimeInterval toDateTimeInterval() {
        return new DateTimeInterval(
                LocalDateTime.of(date, timeslot.startTime()), LocalDateTime.of(date, timeslot.endTime())
        );
    }
}
