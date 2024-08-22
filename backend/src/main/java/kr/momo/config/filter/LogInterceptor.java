package kr.momo.config.filter;

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
public class LogInterceptor implements HandlerInterceptor {

    public static final String TRACE_ID = "traceId";

    private final TraceIdGenerator traceIdGenerator;
    private final LogGenerator logGenerator;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String traceId = traceIdGenerator.generateShortUuid();
        MDC.put(TRACE_ID, traceId);
        logGenerator.logRequest(traceId, request);
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(
            HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex
    ) {
        long startTime = (Long) request.getAttribute("startTime");
        long duration = System.currentTimeMillis() - startTime;
        String traceId = MDC.get(TRACE_ID);
        logGenerator.logResponse(traceId, duration, request, response);
        MDC.remove(TRACE_ID);
    }
}
