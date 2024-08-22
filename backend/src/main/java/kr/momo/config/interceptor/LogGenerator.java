package kr.momo.config.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogGenerator {

    public void logRequest(String traceId, HttpServletRequest request) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        String userInfo = request.getAttribute(JwtInterceptor.USER_INFO).toString();

        log.info("REQUEST [{}][USERID:{}][{} {}]", traceId, userInfo, httpMethod, requestURI);
    }

    public void logResponse(String traceId, long duration, HttpServletRequest request, HttpServletResponse response) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        String userInfo = request.getAttribute(JwtInterceptor.USER_INFO).toString();
        int status = response.getStatus();

        log.info(
                "RESPONSE [{}][USERID:{}][{} {}][{} ms][Status: {}]",
                traceId,
                userInfo,
                httpMethod,
                requestURI,
                duration,
                status
        );
    }
}
