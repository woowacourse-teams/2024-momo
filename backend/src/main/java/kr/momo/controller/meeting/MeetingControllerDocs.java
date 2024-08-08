package kr.momo.controller.meeting;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.annotation.ApiErrorResponse;
import kr.momo.controller.annotation.ApiSuccessResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.service.meeting.dto.MeetingConfirmRequest;
import kr.momo.service.meeting.dto.MeetingConfirmResponse;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.service.meeting.dto.MeetingCreateResponse;
import kr.momo.service.meeting.dto.MeetingResponse;
import kr.momo.service.meeting.dto.MeetingSharingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Meeting", description = "약속 API")
public interface MeetingControllerDocs {

    @Operation(summary = "약속 생성", description = "주최자가 약속을 생성하는 API 입니다.")
    @ApiSuccessResponse.Created(value = "약속 생성 성공")
    ResponseEntity<MomoApiResponse<MeetingCreateResponse>> create(@RequestBody @Valid MeetingCreateRequest request);

    @Operation(
            summary = "약속 확정",
            description = """
                    약속 일정을 확정하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiSuccessResponse.Created(value = "약속 확정 성공")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            2. 유효하지 않은 주최자 정보
            3. 이미 확정된 약속인 경우
            4. 약속이 잠겨있지 않은 경우
            5. 요청 날짜나 시간이 유효하지 않은 경우
            """
    )
    @ApiErrorResponse.Unauthorized("JWT 토큰 인증에 실패하였습니다.")
    @ApiErrorResponse.Forbidden("주최자 권한만 가능합니다.")
    ResponseEntity<MomoApiResponse<MeetingConfirmResponse>> confirm(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id,
            @RequestBody @Valid MeetingConfirmRequest request
    );

    @Operation(summary = "약속 정보 조회", description = "약속의 정보를 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok(value = "약속 정보 조회 성공")
    @ApiErrorResponse.NotFound("약속이 존재하지 않습니다.")
    MomoApiResponse<MeetingResponse> find(@PathVariable @Schema(description = "약속 UUID") String uuid);

    @Operation(summary = "약속 공유 정보 조회", deprecated = true)
    MomoApiResponse<MeetingSharingResponse> findMeetingSharing(@PathVariable String uuid);

    @Operation(
            summary = "약속 잠금",
            description = """
                    약속의 일정 생성을 잠그는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiSuccessResponse.Ok("약속 잠금 성공")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            2. 유효하지 않은 주최자 정보
            """
    )
    @ApiErrorResponse.Unauthorized("JWT 토큰 인증에 실패하였습니다.")
    @ApiErrorResponse.Forbidden("주최자 권한만 가능합니다.")
    void lock(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );

    @Operation(
            summary = "약속 잠금 해제",
            description = """
                    약속의 일정 생성 잠금을 해제하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiSuccessResponse.Ok("약속 잠금 해제 성공")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            2. 유효하지 않은 주최자 정보
            """
    )
    @ApiErrorResponse.Unauthorized("JWT 토큰 인증에 실패하였습니다.")
    @ApiErrorResponse.Forbidden("주최자 권한만 가능합니다.")
    void unlock(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );

    @ApiSuccessResponse.NoContent("약속 취소 성공")
    @ApiErrorResponse.BadRequest("""
            요청이 잘못되었습니다.
            1. 유효하지 않은 UUID
            2. 유효하지 않은 주최자 정보
            """
    )
    @ApiErrorResponse.Unauthorized("JWT 토큰 인증에 실패하였습니다.")
    @ApiErrorResponse.Forbidden("주최자 권한만 가능합니다.")
    public ResponseEntity<Void> cancelConfirmedMeeting(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );
}
