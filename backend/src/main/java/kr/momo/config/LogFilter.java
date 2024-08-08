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

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
        String httpMethod = httpRequest.getMethod();
        String requestURI = httpRequest.getRequestURI();
        String remoteAddr = httpRequest.getRemoteAddr();

        String traceId = generateShortUuid();
        MDC.put(TRACE_ID, traceId);

        long startTime = System.currentTimeMillis();

        try {
            log.info("REQUEST [{}][{} {}][{}]", traceId, httpMethod, requestURI, remoteAddr);
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            log.info("RESPONSE [{}][{}][{} ms]", traceId, requestURI, duration);
            MDC.clear();
        }
    }

    private String generateShortUuid() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().split("-", 2)[0];
    }
}
