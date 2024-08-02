package kr.momo.controller;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class JwtCookieManager {

    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";
    private static final String SAME_SITE_SETTING = "None";
    private static final long EXPIRED_AGE = 0;

    public String createNewCookie(String token, String uuid, long maxAge) {
        return createCookie(token, buildPath(uuid), maxAge);
    }

    public String createExpiredCookie(String uuid) {
        return createCookie("", buildPath(uuid), EXPIRED_AGE);
    }

    private String createCookie(String value, String path, long maxAge) {
        return ResponseCookie.from(ACCESS_TOKEN, value)
                .httpOnly(true)
                .secure(true)
                .path(path)
                .sameSite(SAME_SITE_SETTING)
                .maxAge(maxAge)
                .build()
                .toString();
    }

    private String buildPath(String uuid) {
        return String.format("/meeting/%s", uuid);
    }
}
