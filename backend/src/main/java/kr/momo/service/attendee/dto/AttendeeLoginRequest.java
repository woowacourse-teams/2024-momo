package kr.momo.service.attendee.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

@Schema(description = "참가자 로그인 요청")
public record AttendeeLoginRequest(

        @NotEmpty
        @Schema(description = "참가자 이름", example = "모모")
        @Length(max = 5, message = "참가자 이름은 5자 이하입니다.")
        String attendeeName,

        @NotEmpty
        @Schema(description = "참가자 비밀번호", example = "1234")
        @Length(max = 10, message = "비밀번호는 4자리 숫자입니다.")
        @Pattern(regexp = "^\\d{4}+$", message = "비밀번호는 4자리 숫자여야 합니다.")
        String password
) {
}
