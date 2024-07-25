package com.woowacourse.momo.service.schedule.dto;

import com.woowacourse.momo.domain.schedule.Schedule;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public record SchedulesResponse(List<AttendeesScheduleResponse> schedules) {

    public static SchedulesResponse from(List<Schedule> schedules) {
        Map<LocalDateTime, List<String>> attendeesOfSchedules = groupingAttendeeByMeetingDateTime(schedules);
        List<AttendeesScheduleResponse> scheduleResponses = convertToAttendeesResponses(attendeesOfSchedules);
        return new SchedulesResponse(scheduleResponses);
    }

    private static Map<LocalDateTime, List<String>> groupingAttendeeByMeetingDateTime(List<Schedule> schedules) {
        return schedules.stream()
                .collect(Collectors.groupingBy(
                        Schedule::getDateTime,
                        Collectors.mapping(schedule -> schedule.getAttendee().name(), Collectors.toList())
                ));
    }

    private static List<AttendeesScheduleResponse> convertToAttendeesResponses(
            Map<LocalDateTime, List<String>> attendeesOfSchedules
    ) {
        return attendeesOfSchedules.entrySet().stream()
                .map(attendeesOfSchedule -> new AttendeesScheduleResponse(
                        attendeesOfSchedule.getKey().toLocalDate(),
                        attendeesOfSchedule.getKey().toLocalTime(),
                        attendeesOfSchedule.getValue()
                ))
                .toList();
    }
}
