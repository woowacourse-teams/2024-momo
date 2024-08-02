package kr.momo.controller.attendee;

import jakarta.validation.Valid;
import kr.momo.controller.MomoApiResponse;
import kr.momo.service.attendee.AttendeeService;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.attendee.dto.AttendeeLoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AttendeeController {

    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";
    private static final String SAME_SITE_SETTING = "None";

    private final AttendeeService attendeeService;

    @PostMapping("/api/v1/meetings/{uuid}/login")
    public ResponseEntity<MomoApiResponse<String>> login(
            @PathVariable String uuid, @RequestBody @Valid AttendeeLoginRequest request
    ) {
        AttendeeLoginResponse response = attendeeService.login(uuid, request);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createCookie(response.token(), uuid, -1))
                .body(new MomoApiResponse<>(response.name()));
    }

    @PostMapping("/api/v1/meetings/{uuid}/logout")
    public ResponseEntity<Void> logout(@PathVariable String uuid) {
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createCookie("", uuid, 0))
                .build();
    }

    private String createCookie(String value, String uuid, long maxAge) {
        return ResponseCookie.from(ACCESS_TOKEN, value)
                .httpOnly(true)
                .secure(true)
                .path(buildPath(uuid))
                .sameSite(SAME_SITE_SETTING)
                .maxAge(maxAge)
                .build()
                .toString();
    }

    private String buildPath(String uuid) {
        return String.format("/meeting/%s", uuid);
    }
}
