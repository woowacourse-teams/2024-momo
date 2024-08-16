package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.controller.validator.DateFormatConstraint;
import kr.momo.controller.validator.TimeFormatConstraint;
import org.hibernate.validator.constraints.Length;

@Schema(description = "약속 생성 요청")
public record MeetingCreateRequest(

        @NotBlank
        @Schema(description = "호스트 이름", example = "모모")
        @Length(max = 5, message = "호스트 이름은 5자 이하입니다.")
        String hostName,

        @NotBlank
        @Schema(description = "호스트 비밀번호", example = "1234")
        @Length(max = 10, message = "비밀번호는 10자 이하입니다.")
        @Pattern(regexp = "^[a-zA-Z0-9!@*#$%]+$", message = "비밀번호는 알파벳 대소문자와 숫자만 포함해야 합니다.")
        String hostPassword,

        @NotBlank
        @Schema(description = "약속 이름", example = "팀 모모 회식")
        String meetingName,

        @NotEmpty(message = "적어도 하나의 날짜를 선택해야 합니다.")
        @Schema(description = "가능한 약속 날짜들", ref = "#/components/schemas/availableMeetingDates")
        List<@DateFormatConstraint String> availableMeetingDates,

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

    public LocalTime toMeetingStartTime() {
         return LocalTime.parse(meetingStartTime);
    }

    public LocalTime toMeetingEndTime() {
        return LocalTime.parse(meetingEndTime);
    }
}
