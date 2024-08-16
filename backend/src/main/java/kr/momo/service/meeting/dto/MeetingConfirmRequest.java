package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import kr.momo.controller.validator.DateTimeFormatConstraint;

public record MeetingConfirmRequest(

        @NotNull
        @DateTimeFormatConstraint
        @Schema(description = "시작 날짜 시간")
        String startDateTime,

        @NotNull
        @DateTimeFormatConstraint
        @Schema(description = "종료 날짜 시간")
        String endDateTime
) {

        private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        public MeetingConfirmRequest(LocalDateTime startDateTime, LocalDateTime endDateTime) {
                this(startDateTime.format(dateTimeFormatter), endDateTime.format(dateTimeFormatter));
        }

        public LocalDateTime toStartDateTime() {
                return LocalDateTime.parse(startDateTime, dateTimeFormatter);
        }

        public LocalDateTime toEndDateTime() {
                return LocalDateTime.parse(endDateTime, dateTimeFormatter);
        }
}
