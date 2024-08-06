package kr.momo.controller.attendee;

import jakarta.validation.Valid;
import kr.momo.controller.CookieManager;
import kr.momo.controller.MomoApiResponse;
import kr.momo.service.attendee.AttendeeService;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.attendee.dto.AttendeeLoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AttendeeController {

    private final AttendeeService attendeeService;
    private final CookieManager cookieManager;

    @PostMapping("/api/v1/meetings/{uuid}/login")
    public ResponseEntity<MomoApiResponse<String>> login(
            @PathVariable String uuid, @RequestBody @Valid AttendeeLoginRequest request
    ) {
        AttendeeLoginResponse response = attendeeService.login(uuid, request);
        String path = cookieManager.pathOf(uuid);
        String cookie = cookieManager.createNewCookie(response.token(), path);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie)
                .body(new MomoApiResponse<>(response.name()));
    }

    @PostMapping("/api/v1/meetings/{uuid}/logout")
    public ResponseEntity<Void> logout(@PathVariable String uuid) {
        String cookie = cookieManager.createExpiredCookie(uuid);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie)
                .build();
    }
}
