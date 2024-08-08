package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record MeetingConfirmRequest(

        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate startDate,
        @NotNull
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime startTime,
        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate endDate,
        @NotNull
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime endTime
) {
}
