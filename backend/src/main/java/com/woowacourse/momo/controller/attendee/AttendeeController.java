package com.woowacourse.momo.controller.attendee;

import com.woowacourse.momo.controller.MomoApiResponse;
import com.woowacourse.momo.service.attendee.AttendeeService;
import com.woowacourse.momo.service.attendee.dto.AttendeeLoginRequest;
import com.woowacourse.momo.service.attendee.dto.TokenResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AttendeeController {

    private final AttendeeService attendeeService;

    @PostMapping("/api/v1/login/{uuid}")
    public MomoApiResponse<TokenResponse> login(
            @PathVariable String uuid, @RequestBody @Valid AttendeeLoginRequest request
    ) {
        return new MomoApiResponse<>(attendeeService.login(uuid, request));
    }
}
