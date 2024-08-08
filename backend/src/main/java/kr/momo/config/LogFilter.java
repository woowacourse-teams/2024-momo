package kr.momo.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;

@Slf4j
public class LogFilter implements Filter {

    public static final String TRACE_ID = "traceId";
    private static final String REQUEST_LOG_FORMAT = "REQUEST [{}][{}]";
    private static final String RESPONSE_LOG_FORMAT = "RESPONSE [{}][{}][{} ms]";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        UUID uuid = UUID.randomUUID();
        MDC.put(TRACE_ID, uuid.toString());

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String requestURI = httpRequest.getRequestURI();

        long startTime = System.currentTimeMillis();

        try {
            log.info(REQUEST_LOG_FORMAT, uuid, requestURI);
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            log.info(RESPONSE_LOG_FORMAT, uuid, requestURI, duration);
            MDC.clear();
        }
    }
}
