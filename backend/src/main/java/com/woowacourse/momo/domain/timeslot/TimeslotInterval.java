package com.woowacourse.momo.domain.timeslot;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TimeslotInterval {

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot firstTimeslot;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot lastTimeslot;

    public static List<TimeslotInterval> generate(List<LocalTime> times) {
        List<TimeslotInterval> intervals = new ArrayList<>();

        Timeslot firstTimeSlot = Timeslot.from(times.get(0));
        Timeslot lastTimeSlot = firstTimeSlot;

        int timesCount = times.size();
        for (int i = 1; i < timesCount; i++) {
            Timeslot currentTimeSlot = Timeslot.from(times.get(i));
            if (lastTimeSlot.isNotPreviousSlot(currentTimeSlot)) {
                intervals.add(new TimeslotInterval(firstTimeSlot, lastTimeSlot));
                firstTimeSlot = currentTimeSlot;
            }
            lastTimeSlot = currentTimeSlot;
        }
        intervals.add(new TimeslotInterval(firstTimeSlot, lastTimeSlot));

        return intervals;
    }

    public void validateOverlap(TimeslotInterval other) {
        if (isNotContainedWithin(other)) {
            throw new IllegalArgumentException("선택할 수 없는 시간이다...");
        }
    }

    private boolean isNotContainedWithin(TimeslotInterval other) {
        return (this.getFirstTimeslot().compareTo(other.getFirstTimeslot()) > 0 ||
                this.getLastTimeslot().compareTo(other.getLastTimeslot()) < 0);
    }
}
