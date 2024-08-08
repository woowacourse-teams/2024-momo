package kr.momo.service.attendee.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

@Schema(description = "참가자 로그인 요청")
public record AttendeeLoginRequest(

        @NotEmpty
        @Schema(description = "참가자 이름", example = "모모")
        String attendeeName,

        @NotEmpty
        @Schema(description = "참가자 비밀번호", example = "1234")
        String password) {
}
