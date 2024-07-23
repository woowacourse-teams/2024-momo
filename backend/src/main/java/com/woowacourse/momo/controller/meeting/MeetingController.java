package com.woowacourse.momo.controller.meeting;

import com.woowacourse.momo.controller.MomoApiResponse;
import com.woowacourse.momo.service.meeting.MeetingService;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
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

    @PostMapping("/api/v1/meeting")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody MeetingCreateRequest request, HttpServletResponse response) {
        String uuid = meetingService.create(request);
        response.addHeader(HttpHeaders.LOCATION, "/meeting/" + uuid);
    }

    @GetMapping("/api/v1/meeting/{uuid}/sharing")
    public MomoApiResponse<MeetingSharingResponse> findMeetingSharing(@PathVariable String uuid) {
        MeetingSharingResponse response = meetingService.findMeetingSharing(uuid);
        return new MomoApiResponse<>(response);
    }
}
