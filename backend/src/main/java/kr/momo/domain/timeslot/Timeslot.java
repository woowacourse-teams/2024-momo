package kr.momo.domain.timeslot;

import java.time.Duration;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.TimeslotErrorCode;

public enum Timeslot {

    TIME_0000(LocalTime.of(0, 0)),
    TIME_0030(LocalTime.of(0, 30)),
    TIME_0100(LocalTime.of(1, 0)),
    TIME_0130(LocalTime.of(1, 30)),
    TIME_0200(LocalTime.of(2, 0)),
    TIME_0230(LocalTime.of(2, 30)),
    TIME_0300(LocalTime.of(3, 0)),
    TIME_0330(LocalTime.of(3, 30)),
    TIME_0400(LocalTime.of(4, 0)),
    TIME_0430(LocalTime.of(4, 30)),
    TIME_0500(LocalTime.of(5, 0)),
    TIME_0530(LocalTime.of(5, 30)),
    TIME_0600(LocalTime.of(6, 0)),
    TIME_0630(LocalTime.of(6, 30)),
    TIME_0700(LocalTime.of(7, 0)),
    TIME_0730(LocalTime.of(7, 30)),
    TIME_0800(LocalTime.of(8, 0)),
    TIME_0830(LocalTime.of(8, 30)),
    TIME_0900(LocalTime.of(9, 0)),
    TIME_0930(LocalTime.of(9, 30)),
    TIME_1000(LocalTime.of(10, 0)),
    TIME_1030(LocalTime.of(10, 30)),
    TIME_1100(LocalTime.of(11, 0)),
    TIME_1130(LocalTime.of(11, 30)),
    TIME_1200(LocalTime.of(12, 0)),
    TIME_1230(LocalTime.of(12, 30)),
    TIME_1300(LocalTime.of(13, 0)),
    TIME_1330(LocalTime.of(13, 30)),
    TIME_1400(LocalTime.of(14, 0)),
    TIME_1430(LocalTime.of(14, 30)),
    TIME_1500(LocalTime.of(15, 0)),
    TIME_1530(LocalTime.of(15, 30)),
    TIME_1600(LocalTime.of(16, 0)),
    TIME_1630(LocalTime.of(16, 30)),
    TIME_1700(LocalTime.of(17, 0)),
    TIME_1730(LocalTime.of(17, 30)),
    TIME_1800(LocalTime.of(18, 0)),
    TIME_1830(LocalTime.of(18, 30)),
    TIME_1900(LocalTime.of(19, 0)),
    TIME_1930(LocalTime.of(19, 30)),
    TIME_2000(LocalTime.of(20, 0)),
    TIME_2030(LocalTime.of(20, 30)),
    TIME_2100(LocalTime.of(21, 0)),
    TIME_2130(LocalTime.of(21, 30)),
    TIME_2200(LocalTime.of(22, 0)),
    TIME_2230(LocalTime.of(22, 30)),
    TIME_2300(LocalTime.of(23, 0)),
    TIME_2330(LocalTime.of(23, 30));

    public static final long DURATION_IN_MINUTE;
    private final LocalTime startTime;

    static {
        int slotCount = Timeslot.values().length;
        Duration duration = ChronoUnit.DAYS.getDuration().dividedBy(slotCount);
        DURATION_IN_MINUTE = duration.toMinutes();
    }

    Timeslot(LocalTime startTime) {
        this.startTime = startTime;
    }

    public static Timeslot from(LocalTime localTime) {
        return Arrays.stream(values())
                .filter(timeslot -> timeslot.startTime.equals(localTime))
                .findAny()
                .orElseThrow(() -> new MomoException(TimeslotErrorCode.INVALID_TIMESLOT));
    }

    public boolean isAfter(LocalTime other) {
        return this.startTime.isAfter(other);
    }

    public boolean isBefore(LocalTime other) {
        return this.startTime.isBefore(other);
    }

    public LocalTime startTime() {
        return startTime;
    }

    public LocalTime endTime() {
        return startTime.plusMinutes(DURATION_IN_MINUTE);
    }
}
