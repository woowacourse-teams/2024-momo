package kr.momo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieManager {

    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";
    private static final long SESSION_COOKIE_AGE = -1;
    private static final long EXPIRED_COOKIE_AGE = 0;

    private final String cookieDomain;

    public CookieManager(@Value("${security.cookie.domain}") String cookieDomain) {
        this.cookieDomain = cookieDomain;
    }

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
                .domain(cookieDomain)
                .path(path)
                .maxAge(maxAge)
                .build()
                .toString();
    }

    public String pathOf(String meetingUuid) {
        return String.format("/api/v1/meetings/%s/", meetingUuid);
    }
}
