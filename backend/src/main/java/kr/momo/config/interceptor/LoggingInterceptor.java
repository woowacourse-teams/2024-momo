package kr.momo.config.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@RequiredArgsConstructor
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    public static final String TRACE_ID = "traceId";
    private static final String START_TIME = "startTime";

    private final TraceIdGenerator traceIdGenerator;
    private final LogGenerator logGenerator;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String traceId = traceIdGenerator.generateShortUuid();
        MDC.put(TRACE_ID, traceId);
        logGenerator.logRequest(traceId, request);
        request.setAttribute(START_TIME, System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(
            HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex
    ) {
        long startTime = (Long) request.getAttribute(START_TIME);
        long duration = System.currentTimeMillis() - startTime;
        String traceId = MDC.get(TRACE_ID);
        logGenerator.logResponse(traceId, duration, request, response);
        MDC.clear();
    }
}
