package com.woowacourse.momo.domain.meeting;

import com.woowacourse.momo.domain.BaseEntity;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "meeting")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 40)
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot firstTimeslot;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot lastTimeslot;

    public Meeting(String name, String uuid, Timeslot firstTimeslot, Timeslot lastTimeslot) {
        validateTimeRange(firstTimeslot, lastTimeslot);
        this.name = name;
        this.uuid = uuid;
        this.firstTimeslot = firstTimeslot;
        this.lastTimeslot = lastTimeslot;
    }

    public Meeting(String name, String uuid, LocalTime firstTime, LocalTime lastTime) {
        this(name, uuid, Timeslot.from(firstTime), Timeslot.from(lastTime.minusMinutes(30)));
    }

    private void validateTimeRange(Timeslot firstTimeslot, Timeslot lastTimeslot) {
        if (lastTimeslot == firstTimeslot) {
            return;
        }
        if (!lastTimeslot.isAfter(firstTimeslot)) {
            throw new MomoException(MeetingErrorCode.INVALID_TIME_RANGE);
        }
    }
}
