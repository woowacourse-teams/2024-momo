package kr.momo.controller.attendee;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.annotation.ApiErrorResponse;
import kr.momo.controller.annotation.ApiSuccessResponse;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Attendee", description = "참가자 API")
public interface AttendeeControllerDocs {

    @Operation(
            summary = "참가자 로그인",
            description = """
                    참가자 로그인 API 입니다.<br>
                    입력한 이름이 기존 참가자 목록에 존재하는 경우, 비밀번호를 확인하여 로그인합니다.<br>
                    동일한 이름이 존재하지 않는다면, 새로운 참가자를 생성한 후 자동으로 로그인합니다.
                    """
    )
    @ApiSuccessResponse.Ok("로그인 성공. 쿠키로 JWT 토큰을 응답합니다.")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            2. 유효하지 않은 참가자 이름 길이 (max=20)
            3. 유효하지 않은 참가자 비밀번호 길이 (max=20)
            4. 비밀번호가 일치하지 않음
            """
    )
    ResponseEntity<MomoApiResponse<String>> login(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @RequestBody @Valid AttendeeLoginRequest request
    );

    @Operation(summary = "참가자 로그아웃", description = "참가자 로그아웃 API 입니다.")
    @ApiSuccessResponse.Ok("로그아웃 성공")
    ResponseEntity<Void> logout(@PathVariable @Schema(description = "약속 UUID") String uuid);

    @Operation(summary = "약속의 모든 참여자 조회", description = "약속의 모든 참여자를 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok("약속의 모든 참여자 조회")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            """
    )
    MomoApiResponse<List<String>> findAttendeesOfMeeting(@PathVariable @Schema(description = "약속 UUID") String uuid);
}
