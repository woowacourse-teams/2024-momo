package kr.momo.config.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.slf4j.MDC.MDCCloseable;

@Slf4j
@RequiredArgsConstructor
public class LogFilter implements Filter {

    public static final String TRACE_ID = "traceId";

    private final TraceIdGenerator traceIdGenerator;
    private final LogGenerator logGenerator;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String traceId = traceIdGenerator.generateShortUuid();

        try (MDCCloseable ignored = MDC.putCloseable(TRACE_ID, traceId)) {
            logGenerator.logRequest(traceId, httpRequest);
            long startTime = System.currentTimeMillis();
            filterChain.doFilter(servletRequest, servletResponse);
            long duration = System.currentTimeMillis() - startTime;
            logGenerator.logResponse(traceId, duration, httpRequest, httpResponse);
        }
    }
}
