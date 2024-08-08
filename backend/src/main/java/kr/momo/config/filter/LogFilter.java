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
        MDC.put(TRACE_ID, traceId);

        long startTime = System.currentTimeMillis();

        try {
            logGenerator.logRequest(traceId, httpRequest);
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            logGenerator.logResponse(traceId, startTime, httpRequest, httpResponse);
            MDC.clear();
        }
    }
}
