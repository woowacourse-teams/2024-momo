package kr.momo.domain.schedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import kr.momo.domain.timeslot.Timeslot;

public record DateAndTimeslot(LocalDate date, Timeslot timeslot) {
    public LocalDateTime toDateTime() {
        return LocalDateTime.of(date, timeslot.startTime());
    }
}
