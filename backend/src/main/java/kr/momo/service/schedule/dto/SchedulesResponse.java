package kr.momo.service.schedule.dto;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import kr.momo.domain.schedule.Schedule;

public record SchedulesResponse(List<AttendeesScheduleResponse> schedules) {

    public static SchedulesResponse from(List<Schedule> schedules) {
        Map<LocalDateTime, List<String>> attendeesOfSchedules = groupingAttendeeByMeetingDateTime(schedules);
        List<AttendeesScheduleResponse> scheduleResponses = convertToAttendeesResponses(attendeesOfSchedules);
        return new SchedulesResponse(scheduleResponses);
    }

    private static Map<LocalDateTime, List<String>> groupingAttendeeByMeetingDateTime(List<Schedule> schedules) {
        return schedules.stream()
                .collect(groupingBy(Schedule::getDateTime, mapping(Schedule::attendeeName, toList())));
    }

    private static List<AttendeesScheduleResponse> convertToAttendeesResponses(
            Map<LocalDateTime, List<String>> attendeesOfSchedules
    ) {
        return attendeesOfSchedules.keySet().stream()
                .map(dataTime -> new AttendeesScheduleResponse(
                        dataTime.toLocalDate(),
                        dataTime.toLocalTime(),
                        attendeesOfSchedules.get(dataTime)
                ))
                .toList();
    }
}
