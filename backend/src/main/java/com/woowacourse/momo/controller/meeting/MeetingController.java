package com.woowacourse.momo.controller.meeting;

import com.woowacourse.momo.controller.MomoApiResponse;
import com.woowacourse.momo.service.meeting.MeetingService;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    @PostMapping("/api/v1/meetings")
    public ResponseEntity<MomoApiResponse<MeetingSharingResponse>> create(
            @RequestBody @Valid MeetingCreateRequest request
    ) {
        MeetingSharingResponse response = meetingService.create(request);
        return ResponseEntity.created(URI.create("/meeting/" + response.uuid()))
                .body(new MomoApiResponse<>(response));
    }

    @GetMapping("/api/v1/meetings/{uuid}")
    public MomoApiResponse<MeetingResponse> find(@PathVariable String uuid) {
        MeetingResponse meetingResponse = meetingService.findByUUID(uuid);
        return new MomoApiResponse<>(meetingResponse);
    }

    @GetMapping("/api/v1/meetings/{uuid}/sharing")
    public MomoApiResponse<MeetingSharingResponse> findMeetingSharing(@PathVariable String uuid) {
        MeetingSharingResponse response = meetingService.findMeetingSharing(uuid);
        return new MomoApiResponse<>(response);
    }
}
