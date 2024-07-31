package kr.momo.service.schedule.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

public record ScheduleRecommendResponse(
        LocalDate date,
        String dayOfWeek,
        LocalTime startTime,
        LocalTime endTime,
        List<String> attendeeNames) {

    public static ScheduleRecommendResponse from(
            LocalDateTime startTime,
            LocalDateTime endTime,
            List<String> attendeeNames) {

        return new ScheduleRecommendResponse(
                startTime.toLocalDate(),
                startTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREA),
                startTime.toLocalTime(),
                endTime.toLocalTime(),
                attendeeNames
        );
    }
}
