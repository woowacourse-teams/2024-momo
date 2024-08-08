package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

// TODO 스키마 확인
@Schema(description = "약속 확정 요청", ref = "#/components/schemas/meetingConfirmLocalDateTime")
public record MeetingConfirmRequest(

        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd")
        @Schema(description = "시작 날짜")
        LocalDate startDate,
        @NotNull
        @JsonFormat(pattern = "HH:mm")
        @Schema(description = "시작 시간")
        LocalTime startTime,
        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd")
        @Schema(description = "종료 날짜")
        LocalDate endDate,
        @NotNull
        @JsonFormat(pattern = "HH:mm")
        @Schema(description = "종료 시간")
        LocalTime endTime
) {
}
