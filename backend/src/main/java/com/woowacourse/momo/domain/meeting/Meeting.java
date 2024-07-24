package com.woowacourse.momo.domain.meeting;

import com.woowacourse.momo.domain.BaseEntity;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.domain.timeslot.TimeslotInterval;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "meeting")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 40)
    private String uuid;

    @Embedded
    private TimeslotInterval timeslotInterval;

    public Meeting(String name, String uuid, TimeslotInterval timeslotInterval) {
        this.name = name;
        this.uuid = uuid;
        this.timeslotInterval = timeslotInterval;
    }

    public Meeting(String name, String uuid, Timeslot firstTimeslot, Timeslot lastTimeslot) {
        validateTimeRange(firstTimeslot, lastTimeslot);
        this.name = name;
        this.uuid = uuid;
        this.timeslotInterval = new TimeslotInterval(firstTimeslot, lastTimeslot);
    }

    public Meeting(String name, String uuid, LocalTime firstTime, LocalTime lastTime) {
        this(name, uuid, Timeslot.from(firstTime), Timeslot.from(lastTime.minusMinutes(30)));
    }

    private void validateTimeRange(Timeslot firstTimeslot, Timeslot lastTimeslot) {
        if (firstTimeslot == lastTimeslot) {
            return;
        }
        if (firstTimeslot.isNotBefore(lastTimeslot)) {
            throw new MomoException(MeetingErrorCode.INVALID_TIME_RANGE);
        }
    }

    public Timeslot getValidatedTimeslot(LocalTime other) {
        return this.timeslotInterval.getValidatedTimeslot(other);
    }

    public LocalTime startTimeslotTime() {
        return this.timeslotInterval.getStartTimeslot().getLocalTime();
    }

    public LocalTime endTimeslotTime() {
        return this.timeslotInterval.getEndTimeslot().getLocalTime();
    }
}
