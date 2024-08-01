package kr.momo.service.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.Attendees;

public record ScheduleRecommendResponse(
        LocalDate date,
        String dayOfWeek,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime startTime,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime endTime,
        List<String> attendeeNames) {

    public static ScheduleRecommendResponse from(
            LocalDateTime startTime,
            LocalDateTime endTime,
            List<String> attendeeNames) {

        return new ScheduleRecommendResponse(
                startTime.toLocalDate(),
                startTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREA),
                startTime.toLocalTime(),
                endTime.toLocalTime().plusMinutes(30),
                attendeeNames
        );
    }

    public static ScheduleRecommendResponse from(
            LocalDateTime startTime,
            LocalDateTime endTime,
            Attendees attendees) {

        return new ScheduleRecommendResponse(
                startTime.toLocalDate(),
                startTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREA),
                startTime.toLocalTime(),
                endTime.toLocalTime(),
                attendees.getAttendees().stream().map(Attendee::name).toList()
        );
    }
}
