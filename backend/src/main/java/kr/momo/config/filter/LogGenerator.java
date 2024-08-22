package kr.momo.config.filter;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Optional;
import kr.momo.service.auth.JwtManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogGenerator {

    private static final String ANONYMOUS = "ANONYMOUS";
    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";

    private final JwtManager jwtManager;

    public void logRequest(String traceId, HttpServletRequest request) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        Cookie[] cookies = request.getCookies();
        String userInfo = getCookieValue(cookies).orElse(ANONYMOUS);

        if (isLoginUser(userInfo)) {
            userInfo = String.valueOf(jwtManager.extract(userInfo));
        }

        log.info("REQUEST [{}][USERID:{}][{} {}]", traceId, userInfo, httpMethod, requestURI);
    }

    private Optional<String> getCookieValue(Cookie[] cookies) {
        if (cookies == null) {
            return Optional.empty();
        }

        return Arrays.stream(cookies)
                .filter(cookie -> ACCESS_TOKEN.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    private boolean isLoginUser(String token) {
        return !ANONYMOUS.equals(token);
    }

    public void logResponse(String traceId, long duration, HttpServletRequest request, HttpServletResponse response) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        int status = response.getStatus();

        log.info("RESPONSE [{}][{} {}][{} ms][Status: {}]", traceId, httpMethod, requestURI, duration, status);
    }
}
