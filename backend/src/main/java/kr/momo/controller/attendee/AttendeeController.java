package kr.momo.controller.attendee;

import jakarta.validation.Valid;
import kr.momo.service.attendee.AttendeeService;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
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

    private final AttendeeService attendeeService;

    @PostMapping("/api/v1/meetings/{uuid}/login")
    public ResponseEntity<Void> login(@PathVariable String uuid, @RequestBody @Valid AttendeeLoginRequest request) {
        String token = attendeeService.login(uuid, request);
        String path = String.format("/api/v1/meetings/%s/", uuid);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, createCookie(token, path))
                .build();
    }

    private String createCookie(String value, String path) {
        return ResponseCookie.from(ACCESS_TOKEN, value)
                .httpOnly(true)
                .secure(true)
                .path(path)
                .build()
                .toString();
    }
}
