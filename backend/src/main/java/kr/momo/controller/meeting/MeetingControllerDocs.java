package kr.momo.controller.meeting;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.exception.CustomProblemDetail;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.service.meeting.dto.MeetingCreateResponse;
import kr.momo.service.meeting.dto.MeetingResponse;
import kr.momo.service.meeting.dto.MeetingSharingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Meeting", description = "약속 API")
public interface MeetingControllerDocs {

    @Operation(
            summary = "약속 생성",
            description = "주최자가 약속을 생성하는 API 입니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "약속 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MeetingCreateResponse.class)
                    )
            )
    })
    ResponseEntity<MomoApiResponse<MeetingCreateResponse>> create(@RequestBody @Valid MeetingCreateRequest request);

    @Operation(
            summary = "약속 정보 조회",
            description = "약속의 정보를 조회하는 API 입니다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "약속 정보 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = MeetingResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "약속이 존재하지 않습니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            )
    })
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
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "약속 잠금 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            요청이 잘못되었습니다.
                            1. 유효하지 않은 UUID
                            2. 유효하지 않은 주최자 정보
                            """,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "JWT 토큰 인증에 실패하였습니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "주최자 권한만 가능합니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            )
    })
    void lock(@PathVariable @Schema(description = "약속 UUID") String uuid,
              @AuthAttendee @Schema(hidden = true) long id);

    @Operation(
            summary = "약속 잠금 해제",
            description = """
                    약속의 일정 생성 잠금을 해제하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "약속 잠금 해제 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            요청이 잘못되었습니다.
                            1. 유효하지 않은 UUID
                            2. 유효하지 않은 주최자 정보
                            """,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "JWT 토큰 인증에 실패하였습니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "주최자 권한만 가능합니다.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            )
    })
    void unlock(@PathVariable @Schema(description = "약속 UUID") String uuid,
                @AuthAttendee @Schema(hidden = true) long id);
}
