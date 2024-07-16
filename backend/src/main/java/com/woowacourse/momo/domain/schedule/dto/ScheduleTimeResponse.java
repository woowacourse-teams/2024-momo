package com.woowacourse.momo.domain.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

// TODO: 레코드 명 고민
public record ScheduleTimeResponse(
        LocalDate date,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") List<LocalTime> times
) {

    // TODO: 디미터 법칙 지키기
    public static ScheduleTimeResponse from(List<Schedule> schedules) {

        LocalDate date = schedules.stream()
                .map(schedule -> schedule.getAvailableDate().getDate())
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);

        List<LocalTime> localTimes = schedules.stream()
                .map(Schedule::getTimeslot)
                .map(Timeslot::getTime)
                .sorted()
                .toList();
        return new ScheduleTimeResponse(date, localTimes);
    }
}
