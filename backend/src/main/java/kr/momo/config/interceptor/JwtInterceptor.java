package kr.momo.config.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Optional;
import kr.momo.service.auth.JwtManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    public static final String USER_INFO = "userInfo";

    private static final String ANONYMOUS = "ANONYMOUS";
    private static final String ACCESS_TOKEN = "ACCESS_TOKEN";

    private final JwtManager jwtManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Cookie[] cookies = request.getCookies();
        String userInfo = getCookieValue(cookies).orElse(ANONYMOUS);
        if (isLoginUser(userInfo)) {
            userInfo = String.valueOf(jwtManager.extract(userInfo));
        }
        MDC.put(USER_INFO, userInfo);

        return true;
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
}
