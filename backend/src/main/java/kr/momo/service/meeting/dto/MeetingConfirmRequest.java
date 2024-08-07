package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Schema(description = "약속 확정 요청", ref = "#/components/schemas/meetingConfirmLocalDateTime")
public record MeetingConfirmRequest(

        @NotNull
        @Schema(description = "시작 날짜 시간")
        LocalDateTime startDateTime,

        @NotNull
        @Schema(description = "종료 날짜 시간")
        LocalDateTime endDateTime
) {
}
