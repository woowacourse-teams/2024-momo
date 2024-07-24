package com.woowacourse.momo.domain.timeslot;

import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.ScheduleErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@EqualsAndHashCode(of = {"startTimeslot", "endTimeslot"})
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeslotInterval {

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot startTimeslot;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot endTimeslot;

    public Timeslot getValidatedTimeslot(LocalTime other) {
        if (isNotContainedWithin(other)) {
            throw new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_TIMESLOT);
        }
        return Timeslot.from(other);
    }

    private boolean isNotContainedWithin(LocalTime other) {
        return this.startTimeslot.isAfter(other) || this.endTimeslot.isBefore(other);
    }
}
