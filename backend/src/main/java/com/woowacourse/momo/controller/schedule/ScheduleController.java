package com.woowacourse.momo.controller.schedule;

import com.woowacourse.momo.controller.MomoApiResponse;
import com.woowacourse.momo.service.schedule.ScheduleService;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/api/v1/schedule/{uuid}")
    public void create(@PathVariable String uuid, @RequestBody @Valid ScheduleCreateRequest request) {
        scheduleService.create(uuid, request);
    }

    @GetMapping("/api/v1/meeting/{uuid}/schedule")
    public MomoApiResponse<ScheduleOneAttendeeResponse> findSchedulesOfAttendee(@PathVariable String uuid, String attendeeName) {
        ScheduleOneAttendeeResponse response = scheduleService.findSingleSchedule(uuid, attendeeName);
        return new MomoApiResponse<>(response);
    }
}
