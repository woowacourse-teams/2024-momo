package kr.momo.controller.attendee;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import kr.momo.service.attendee.AttendeeService;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import lombok.RequiredArgsConstructor;
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
    public void login(
            @PathVariable String uuid, @RequestBody @Valid AttendeeLoginRequest request, HttpServletResponse response
    ) {
        String token = attendeeService.login(uuid, request);
        String path = String.format("/api/v1/meetings/%s/", uuid);

        Cookie cookie = createCookie(token, path);
        response.addCookie(cookie);
    }

    private Cookie createCookie(String value, String path) {
        Cookie cookie = new Cookie(ACCESS_TOKEN, value);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath(path);
        return cookie;
    }
}
