package kr.momo.domain.timeslot;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalTime;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.exception.code.ScheduleErrorCode;
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
    @Column(nullable = false, length = 10)
    private Timeslot startTimeslot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Timeslot endTimeslot;

    public TimeslotInterval(LocalTime startTime, LocalTime lastTime) {
        validateTimeRange(startTime, lastTime);
        this.startTimeslot = Timeslot.from(startTime);
        this.endTimeslot = Timeslot.from(lastTime);
    }

    private void validateTimeRange(LocalTime firstTime, LocalTime lastTime) {
        if (firstTime.isAfter(lastTime)) {
            throw new MomoException(MeetingErrorCode.INVALID_TIME_RANGE);
        }
    }

    public Timeslot getValidatedTimeslot(LocalTime other) {
        if (isNotContainedWithin(other)) {
            throw new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_TIMESLOT);
        }
        return Timeslot.from(other);
    }

    private boolean isNotContainedWithin(LocalTime other) {
        return this.startTimeslot.isAfter(other) || this.endTimeslot.isBefore(other);
    }

    public void validateContainedWithin(LocalTime other) {
        if (isNotContainedWithin(other)) {
            throw new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_TIMESLOT);
        }
    }
}
