package kr.momo.service.schedule.dto;

import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import kr.momo.domain.schedule.Schedule;

@Schema(description = "특정 날짜의 일정 응답")
public record ScheduleDateTimesResponse(

        @Schema(type = "string", description = "일정 날짜", example = "2024-08-06")
        LocalDate date,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(description = "일정 시간 목록", example = "[\"12:00\", \"14:00\", \"16:00\"]")
        List<LocalTime> times
) {
    public static List<ScheduleDateTimesResponse> from(List<Schedule> schedules) {
        Map<LocalDate, List<LocalTime>> results = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::date, mapping(Schedule::time, toList())));

        return results.keySet().stream()
                .map(date -> new ScheduleDateTimesResponse(date, results.get(date)))
                .toList();
    }
}
