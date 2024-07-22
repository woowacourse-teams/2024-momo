package com.woowacourse.momo.domain.schedule;

import com.woowacourse.momo.domain.BaseEntity;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.domain.timeslot.TimeslotInterval;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "schedule")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attendee_id", nullable = false)
    private Attendee attendee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "available_date_id", nullable = false)
    private AvailableDate availableDate;

    @Embedded
    private TimeslotInterval timeslotInterval;

    public Schedule(Attendee attendee, AvailableDate availableDate, TimeslotInterval timeslotInterval) {
        this.attendee = attendee;
        this.availableDate = availableDate;
        this.timeslotInterval = timeslotInterval;
    }

    public Schedule(Attendee attendee, AvailableDate availableDate, Timeslot firstTimeslot, Timeslot lastTimeslot) {
        this(attendee, availableDate, new TimeslotInterval(firstTimeslot, lastTimeslot));
    }

    public Timeslot getFirstTimeslot() {
        return timeslotInterval.getFirstTimeslot();
    }
}
