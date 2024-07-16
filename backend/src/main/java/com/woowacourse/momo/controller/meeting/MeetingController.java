package com.woowacourse.momo.controller.meeting;

import com.woowacourse.momo.controller.MomoApiResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @GetMapping("/api/v1/meeting/{uuid}")
    public MomoApiResponse<MeetingResponse> find(@PathVariable String uuid) {
        MeetingResponse meetingResponse = meetingService.findByUUID(uuid);
        return new MomoApiResponse<>(meetingResponse);
    }
}
