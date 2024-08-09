package kr.momo.config.filter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class LogGenerator {

    public void logRequest(String traceId, HttpServletRequest request) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        String remoteAddr = request.getRemoteAddr();

        log.info("REQUEST [{}][{} {}][{}]", traceId, httpMethod, requestURI, remoteAddr);
    }

    public void logResponse(String traceId, long duration, HttpServletRequest request, HttpServletResponse response) {
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        int status = response.getStatus();

        log.info("RESPONSE [{}][{} {}][{} ms][Status: {}]", traceId, httpMethod, requestURI, duration, status);
    }
}
