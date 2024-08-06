package kr.momo.controller.schedule;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.exception.CustomProblemDetail;
import kr.momo.service.schedule.ScheduleService;
import kr.momo.service.schedule.dto.RecommendedScheduleResponse;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import kr.momo.service.schedule.dto.SchedulesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Schedule", description = "일정 API")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/api/v1/meetings/{uuid}/schedules")
    @Operation(
            summary = "일정 생성",
            description = """
                    일정 생성 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "일정 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = """
                            요청이 잘못되었습니다.
                            1. 유효하지 않은 UUID
                            2. 약속이 잠겨있는 경우
                            3. 유효하지 않은 참가자 정보
                            4. 선택한 날짜가 약속의 후보 날짜가 아닌 경우
                            5. 선택한 시간이 약속의 시간 범위를 벗어난 경우
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
            )
    })
    public void create(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id,
            @RequestBody @Valid ScheduleCreateRequest request
    ) {
        scheduleService.create(uuid, id, request);
    }

    @GetMapping("/api/v1/meetings/{uuid}/schedules")
    @Operation(
            summary = "모든 일정 조회",
            description = """
                    약속의 모든 일정들을 조회하는 API 입니다.<br>
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SchedulesResponse.class)
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
    public MomoApiResponse<SchedulesResponse> findAll(@PathVariable @Schema(description = "약속 UUID") String uuid) {
        SchedulesResponse response = scheduleService.findAllSchedules(uuid);
        return new MomoApiResponse<>(response);
    }

    @GetMapping(path = "/api/v1/meetings/{uuid}/schedules", params = "attendeeName")
    @Operation(
            summary = "단일 참가자 일정 조회",
            description = """
                    참가자 필터링을 통해 일정을 조회하는 API 입니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "단일 참가자 일정 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ScheduleOneAttendeeResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            존재하지 않는 정보입니다.
                            1. 약속 정보가 존재하지 않음
                            2. 약속 참가자 정보가 존재하지 않음
                            """,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomProblemDetail.class)
                    )
            )
    })
    public MomoApiResponse<ScheduleOneAttendeeResponse> findSchedulesOfAttendee(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @Parameter(description = "참가자 이름", example = "모모") String attendeeName
    ) {
        ScheduleOneAttendeeResponse response = scheduleService.findSingleSchedule(uuid, attendeeName);
        return new MomoApiResponse<>(response);
    }

    @GetMapping("/api/v1/meetings/{uuid}/attendees/me/schedules")
    @Operation(
            summary = "자신의 일정 조회",
            description = """
                    자신의 일정을 조회하는 API 입니다.<br>
                    이 요청은 JWT 토큰 인증이 필요합니다.
                    """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "일정 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ScheduleOneAttendeeResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = """
                            존재하지 않는 정보입니다.
                            1. 약속 정보가 존재하지 않음
                            2. 약속 참가자 정보가 존재하지 않음
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
            )
    })
    public MomoApiResponse<ScheduleOneAttendeeResponse> findMySchedule(
            @PathVariable @Schema(description = "약속 UUID") String uuid,
            @AuthAttendee @Schema(hidden = true) long id
    ) {
        ScheduleOneAttendeeResponse response = scheduleService.findMySchedule(uuid, id);
        return new MomoApiResponse<>(response);
    }

    @GetMapping("/api/v1/meetings/{uuid}/recommended-schedules")
    public MomoApiResponse<List<RecommendedScheduleResponse>> recommendSchedules(
            @PathVariable String uuid, @RequestParam String recommendType, @RequestParam List<String> attendeeNames
    ) {
        List<RecommendedScheduleResponse> response = scheduleService.recommendSchedules(
                uuid, recommendType, attendeeNames
        );
        return new MomoApiResponse<>(response);
    }
}
