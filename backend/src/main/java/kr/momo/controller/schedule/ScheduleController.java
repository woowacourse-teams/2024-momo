package kr.momo.controller.schedule;

import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.service.schedule.ScheduleService;
import kr.momo.service.schedule.dto.AttendeeScheduleResponse;
import kr.momo.service.schedule.dto.RecommendedSchedulesResponse;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.ScheduleRecommendRequest;
import kr.momo.service.schedule.dto.SchedulesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ScheduleController implements ScheduleControllerDocs {

    private final ScheduleService scheduleService;

    @PostMapping("/api/v1/meetings/{uuid}/schedules")
    public void create(
            @PathVariable String uuid, @AuthAttendee long id, @RequestBody @Valid ScheduleCreateRequest request
    ) {
        scheduleService.create(uuid, id, request);
    }

    @GetMapping("/api/v1/meetings/{uuid}/schedules")
    public MomoApiResponse<SchedulesResponse> findAll(@PathVariable String uuid) {
        SchedulesResponse response = scheduleService.findAllSchedules(uuid);
        return new MomoApiResponse<>(response);
    }

    @GetMapping(path = "/api/v1/meetings/{uuid}/schedules", params = "attendeeName")
    public MomoApiResponse<AttendeeScheduleResponse> findSchedulesOfAttendee(
            @PathVariable String uuid, String attendeeName
    ) {
        AttendeeScheduleResponse response = scheduleService.findSingleSchedule(uuid, attendeeName);
        return new MomoApiResponse<>(response);
    }

    @GetMapping("/api/v1/meetings/{uuid}/attendees/me/schedules")
    public MomoApiResponse<AttendeeScheduleResponse> findMySchedule(@PathVariable String uuid, @AuthAttendee long id) {
        AttendeeScheduleResponse response = scheduleService.findMySchedule(uuid, id);
        return new MomoApiResponse<>(response);
    }

    @GetMapping("/api/v1/meetings/{uuid}/recommended-schedules")
    public MomoApiResponse<RecommendedSchedulesResponse> recommendSchedules(
            @PathVariable String uuid, @ModelAttribute @Valid ScheduleRecommendRequest request
    ) {
        RecommendedSchedulesResponse response = scheduleService.recommendSchedules(
                uuid, request.recommendType(), request.attendeeNames(), request.minTime()
        );
        return new MomoApiResponse<>(response);
    }
}
