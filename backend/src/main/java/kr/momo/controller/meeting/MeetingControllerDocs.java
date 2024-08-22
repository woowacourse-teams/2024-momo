package kr.momo.controller.meeting;

import static kr.momo.controller.annotation.ApiErrorResponse.ERROR_CODE_TABLE_HEADER;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.annotation.ApiErrorResponse;
import kr.momo.controller.annotation.ApiSuccessResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.service.meeting.dto.ConfirmedMeetingResponse;
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
    @ApiSuccessResponse.Created("약속 생성 성공")
    @ApiErrorResponse.BadRequest(ERROR_CODE_TABLE_HEADER + """
            | INVALID_NAME_LENGTH | 이름 길이는 1자 이상 5자 이하 까지 가능합니다. |
            | INVALID_PASSWORD_LENGTH | 비밀번호 길이는 1자 이상 10자 이하 까지 가능합니다. |
            | PAST_NOT_PERMITTED | 과거 날짜로는 약속을 생성할 수 없습니다. |
            """)
    @ApiErrorResponse.InternalServerError(ERROR_CODE_TABLE_HEADER + """
            | UUID_GENERATION_FAILURE | 약속 생성 과정 중 키 생성에 실패했습니다. 잠시 후 다시 시도해주세요. |
            """)
    ResponseEntity<MomoApiResponse<MeetingCreateResponse>> create(@RequestBody @Valid MeetingCreateRequest request);

    @Operation(
            summary = "약속 확정",
            description = """
                    약속 일정을 확정하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """)
    @ApiSuccessResponse.Created("약속 확정 성공")
    @ApiErrorResponse.BadRequest(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            | INVALID_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            | ALREADY_CONFIRMED | 이미 확정된 약속입니다. |
            | MEETING_UNLOCKED | 약속이 잠겨있지 않아 수행할 수 없습니다. |
            | INVALID_DATETIME_RANGE | 날짜 또는 시간이 잘못되었습니다. |
            """)
    @ApiErrorResponse.Unauthorized(ERROR_CODE_TABLE_HEADER + """
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다. |
            """)
    @ApiErrorResponse.Forbidden(ERROR_CODE_TABLE_HEADER + """
            | ACCESS_DENIED | 접근이 거부되었습니다. |
            """)
    ResponseEntity<MomoApiResponse<MeetingConfirmResponse>> confirm(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id,
            @RequestBody @Valid MeetingConfirmRequest request
    );

    @Operation(summary = "약속 정보 조회", description = "약속의 정보를 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok(value = "약속 정보 조회 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """
            | NOT_FOUND_MEETING | 약속이 존재하지 않습니다. |
            """)
    MomoApiResponse<MeetingResponse> find(@PathVariable @Schema(description = "약속 UUID") String uuid);

    @Operation(summary = "약속 공유 정보 조회", deprecated = true)
    MomoApiResponse<MeetingSharingResponse> findMeetingSharing(@PathVariable String uuid);

    @Operation(summary = "확정된 약속 정보 조회", description = "확정된 약속의 정보를 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok(value = "확정된 약속 정보 조회 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """
            | NOT_FOUND_MEETING | 존재하지 않는 약속 정보 입니다. |
            | NOT_CONFIRMED | 아직 확정되지 않은 약속입니다. |
            """)
    @ApiErrorResponse.InternalServerError(ERROR_CODE_TABLE_HEADER + """
            | HOST_NOT_FOUND | 약속의 주최자 정보를 찾을 수 없습니다. 관리자에게 문의하세요. |
            """)
    MomoApiResponse<ConfirmedMeetingResponse> findConfirmedMeeting(
            @PathVariable @Schema(description = "약속 UUID") String uuid
    );

    @Operation(
            summary = "약속 잠금",
            description = """
                    약속의 일정 생성을 잠그는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """)
    @ApiSuccessResponse.Ok("약속 잠금 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """            
            | NOT_FOUND_MEETING | 존재하지 않는 약속 정보 입니다. |
            | NOT_FOUND_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            """)
    @ApiErrorResponse.Unauthorized(ERROR_CODE_TABLE_HEADER + """
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다.|
            """)
    @ApiErrorResponse.Forbidden(ERROR_CODE_TABLE_HEADER + """
            | ACCESS_DENIED | 접근이 거부되었습니다. |
            """)
    void lock(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );

    @Operation(
            summary = "약속 잠금 해제",
            description = """
                    약속의 일정 생성 잠금을 해제하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """)
    @ApiSuccessResponse.Ok("약속 잠금 해제 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """            
            | NOT_FOUND_MEETING | 존재하지 않는 약속 정보 입니다. |
            | NOT_FOUND_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            """)
    @ApiErrorResponse.Unauthorized(ERROR_CODE_TABLE_HEADER + """
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다.|
            """)
    @ApiErrorResponse.Forbidden(ERROR_CODE_TABLE_HEADER + """
            | ACCESS_DENIED | 접근이 거부되었습니다. |
            """)
    void unlock(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );

    @ApiSuccessResponse.NoContent("약속 취소 성공")
    @ApiErrorResponse.BadRequest(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            | INVALID_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            """)
    @ApiErrorResponse.Unauthorized("""
            | 에러 코드 | 에러 메시지 |
            |---|---|
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다.|
            """)
    @ApiErrorResponse.Forbidden(ERROR_CODE_TABLE_HEADER + """
            | ACCESS_DENIED | 접근이 거부되었습니다. |
            """)
    ResponseEntity<Void> cancelConfirmedMeeting(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );
}
