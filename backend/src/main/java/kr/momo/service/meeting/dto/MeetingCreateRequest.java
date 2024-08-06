package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Schema(description = "약속 생성 요청")
public record MeetingCreateRequest(
        @NotBlank
        @Schema(description = "호스트 이름", example = "모모")
        String hostName,

        @NotBlank
        @Schema(description = "호스트 비밀번호", example = "1234")
        String hostPassword,

        @NotBlank
        @Schema(description = "약속 이름", example = "팀 모모 회식")
        String meetingName,

        @NotNull
        @Schema(description = "약속 가능한 날짜들", example = "[\"2024-08-06\", \"2024-08-07\"]")
        List<LocalDate> meetingAvailableDates,

        @NotNull
        @Schema(type = "string", pattern = "HH:mm", description = "약속 시작 시간", example = "12:00")
        LocalTime meetingStartTime,

        @NotNull
        @Schema(type = "string", pattern = "HH:mm", description = "약속 종료 시간", example = "20:00")
        LocalTime meetingEndTime
) {
}
