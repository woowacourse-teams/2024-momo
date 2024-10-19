package kr.momo.controller.schedule;

import static kr.momo.controller.annotation.ApiErrorResponse.ERROR_CODE_TABLE_HEADER;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.annotation.ApiErrorResponse;
import kr.momo.controller.annotation.ApiSuccessResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.service.schedule.dto.AttendeeScheduleResponse;
import kr.momo.service.schedule.dto.RecommendedSchedulesResponse;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.ScheduleRecommendRequest;
import kr.momo.service.schedule.dto.SchedulesResponse;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Schedule", description = "일정 API")
public interface ScheduleControllerDocs {

    @Operation(
            summary = "일정 생성",
            description = """
                    일정 생성 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """)
    @ApiSuccessResponse.Ok("일정 생성 성공")
    @ApiErrorResponse.BadRequest(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            | MEETING_LOCKED | 약속이 잠겨있어 수행할 수 없습니다. |
            | INVALID_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            | INVALID_TIMESLOT | 유효한 시간이 아닙니다. 선택한 시간을 사용할 수 없습니다. |
            | INVALID_SCHEDULE_TIMESLOT | 해당 시간을 선택할 수 없습니다. 주최자가 설정한 시간만 선택 가능합니다. |
            """)
    @ApiErrorResponse.Unauthorized(ERROR_CODE_TABLE_HEADER + """
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다.|
            """)
    void create(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id,
            @RequestBody @Valid ScheduleCreateRequest request
    );

    @Operation(summary = "모든 일정 조회", description = "약속의 모든 일정들을 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok(value = "조회 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            """)
    MomoApiResponse<SchedulesResponse> findAll(@PathVariable @Schema(description = "약속 UUID") String uuid);

    @Operation(summary = "단일 참가자 일정 조회", description = "참가자로 일정을 필터링하여 조회하는 API 입니다.")
    @ApiSuccessResponse.Ok("단일 참가자 일정 조회 성공")
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            | INVALID_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            """)
    MomoApiResponse<AttendeeScheduleResponse> findSchedulesOfAttendee(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @Parameter(description = "참가자 이름", example = "모모") String attendeeName
    );

    @Operation(
            summary = "자신의 일정 조회",
            description = """
                    자신의 일정을 조회하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """)
    @ApiSuccessResponse.Ok("일정 조회 성공")
    @ApiErrorResponse.Unauthorized(ERROR_CODE_TABLE_HEADER + """
            | UNAUTHORIZED_TOKEN | 유효하지 않은 토큰입니다.|
            """)
    @ApiErrorResponse.NotFound(ERROR_CODE_TABLE_HEADER + """
            | INVALID_UUID | 유효하지 않은 UUID 입니다. |
            | INVALID_ATTENDEE | 해당 약속에 참여하는 참가자 정보가 없습니다. |
            """)
    MomoApiResponse<AttendeeScheduleResponse> findMySchedule(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    );

    @Operation(
            summary = "추천 일정 조회",
            description = """
                    참여자 수를 기준으로 계산된 추천 일정을 조회하는 API입니다.<br>
                    추천 기준에 따라 이른 시간 순 혹은 길게 볼 수 있는 순으로 추천합니다.
                    - earliest: 이른 시간 순
                    - longTerm: 길게 볼 수 있는 순
                    
                    추천 연산에 사용할 참여자 이름을 명시하여 필터링할 수 있습니다.<br>
                    약속 내의 모든 참여자가 전달된 경우 일부 참여자들이 참여할 수 있는 일정을 함께 추천하며,<br>
                    이외의 경우 전달된 참여자들이 모두 참여할 수 있는 일정이 추천됩니다.
                    """)
    @ApiSuccessResponse.Ok("추천 일정 조회 성공")
    MomoApiResponse<RecommendedSchedulesResponse> recommendSchedules(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @ModelAttribute @Valid ScheduleRecommendRequest request
    );
}
