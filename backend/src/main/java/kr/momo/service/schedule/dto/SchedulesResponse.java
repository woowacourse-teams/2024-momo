package kr.momo.service.schedule.dto;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import kr.momo.domain.schedule.Schedule;

@Schema(description = "모든 일정 응답")
public record SchedulesResponse(

        @Schema(description = "일정 정보 리스트")
        List<AttendeesScheduleResponse> schedules
) {
    public static SchedulesResponse from(List<Schedule> schedules) {
        Map<LocalDateTime, List<String>> attendeesOfSchedules = groupingAttendeeByMeetingDateTime(schedules);
        List<AttendeesScheduleResponse> scheduleResponses = convertToAttendeesResponses(attendeesOfSchedules);
        return new SchedulesResponse(scheduleResponses);
    }

    private static Map<LocalDateTime, List<String>> groupingAttendeeByMeetingDateTime(List<Schedule> schedules) {
        return schedules.stream()
                .collect(groupingBy(Schedule::dateTime, mapping(Schedule::attendeeName, toList())));
    }

    private static List<AttendeesScheduleResponse> convertToAttendeesResponses(
            Map<LocalDateTime, List<String>> attendeesOfSchedules
    ) {
        return attendeesOfSchedules.keySet().stream()
                .map(dateTime -> new AttendeesScheduleResponse(
                        dateTime.toLocalDate(),
                        dateTime.toLocalTime(),
                        attendeesOfSchedules.get(dateTime)
                ))
                .toList();
    }
}
