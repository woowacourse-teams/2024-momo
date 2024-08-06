package kr.momo.controller;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieManager {

    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";
    private static final String SAME_SITE_OPTION = "None";
    private static final long SESSION_COOKIE_AGE = -1;
    private static final long EXPIRED_COOKIE_AGE = 0;

    public String createNewCookie(String value, String path) {
        return createCookie(value, path, SESSION_COOKIE_AGE);
    }

    public String createExpiredCookie(String path) {
        return createCookie("", path, EXPIRED_COOKIE_AGE);
    }

    private String createCookie(String value, String path, long maxAge) {
        return ResponseCookie.from(ACCESS_TOKEN, value)
                .httpOnly(true)
                .secure(true)
                .path(path)
                .sameSite(SAME_SITE_OPTION)
                .maxAge(maxAge)
                .build()
                .toString();
    }

    public String pathOf(String meetingUuid) {
        return String.format("/api/v1/meeting/%s/", meetingUuid);
    }
}
