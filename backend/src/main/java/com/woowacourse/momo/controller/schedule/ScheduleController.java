package com.woowacourse.momo.controller.schedule;

import com.woowacourse.momo.service.schedule.ScheduleService;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
}
