package kr.momo.domain.meeting;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalTime;
import kr.momo.domain.BaseEntity;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.domain.timeslot.TimeslotInterval;
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

    @Column(nullable = false, length = 8)
    private String uuid;

    @Column(nullable = false)
    private boolean isLocked;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Type type;

    @Embedded
    private TimeslotInterval timeslotInterval;

    public Meeting(String name, String uuid, LocalTime firstTime, LocalTime lastTime, Type type) {
        this.name = name;
        this.uuid = uuid;
        this.isLocked = false;
        this.type = type;
        this.timeslotInterval = new TimeslotInterval(firstTime, lastTime.minusMinutes(30));
    }

    public Meeting(String name, String uuid, LocalTime firstTime, LocalTime lastTime) {
        this(name, uuid, firstTime, lastTime, Type.DATETIME);
    }

    private boolean isDaysOnly() {
        return type.isDaysOnly();
    }

    public void lock() {
        isLocked = true;
    }

    public void unlock() {
        isLocked = false;
    }

    public boolean isTimeInRange(LocalTime startTime, LocalTime endTime) {
        return timeslotInterval.isTimeInRange(startTime, endTime);
    }

    public boolean isNotFullTime() {
        return timeslotInterval.isNotFullTime();
    }

    public Timeslot getValidatedTimeslot(LocalTime other) {
        return timeslotInterval.getValidatedTimeslot(other);
    }

    public LocalTime earliestTime() {
        return timeslotInterval.getStartTimeslot().startTime();
    }

    public LocalTime lastTime() {
        return timeslotInterval.getEndTimeslot().endTime();
    }
}
