package kr.momo.service.meeting.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record MeetingConfirmRequest(
        @NotNull LocalDateTime startDateTime,
        @NotNull LocalDateTime endDateTime
) {
}
