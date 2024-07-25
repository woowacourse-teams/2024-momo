package com.woowacourse.momo.service.schedule.dto;

import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import com.woowacourse.momo.domain.schedule.Schedule;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record ScheduleOneAttendeeDateTimesResponse(LocalDate date, List<LocalTime> times) {

    public static List<ScheduleOneAttendeeDateTimesResponse> from(List<Schedule> schedules) {
        Map<LocalDate, List<LocalTime>> results = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::date, mapping(Schedule::time, toList())));

        return results.keySet()
                .stream()
                .map(date -> new ScheduleOneAttendeeDateTimesResponse(date, results.get(date)))
                .toList();
    }
}
