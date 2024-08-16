package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import kr.momo.controller.validator.TimeFormatConstraint;

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
        @Schema(description = "가능한 약속 날짜들", ref = "#/components/schemas/availableMeetingDates")
        List<String> availableMeetingDates,

        @NotBlank
        @TimeFormatConstraint
        @Schema(type = "string", pattern = "HH:mm", description = "약속 시작 시간", example = "01:00")
        String meetingStartTime,

        @NotBlank
        @TimeFormatConstraint
        @Schema(type = "string", pattern = "HH:mm", description = "약속 종료 시간", example = "20:00")
        String meetingEndTime
) {

    public List<LocalDate> toAvailableMeetingDates() {
        return availableMeetingDates.stream()
                .map(LocalDate::parse)
                .toList();
    }
}
