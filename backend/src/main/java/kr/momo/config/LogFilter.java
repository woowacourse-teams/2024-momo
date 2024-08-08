package kr.momo.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
        HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;

        String traceId = generateShortUuid();
        MDC.put(TRACE_ID, traceId);

        String httpMethod = httpRequest.getMethod();
        String requestURI = httpRequest.getRequestURI();
        String remoteAddr = httpRequest.getRemoteAddr();
        long startTime = System.currentTimeMillis();
        int status = httpResponse.getStatus();

        try {
            log.info("REQUEST [{}][{} {}][{}]", traceId, httpMethod, requestURI, remoteAddr);
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            log.info("RESPONSE [{}][{} {}][{} ms][Status: {}]", traceId, httpMethod, requestURI, duration, status);
            MDC.clear();
        }
    }

    private String generateShortUuid() {
        return UUID.randomUUID().toString().split("-", 2)[0];
    }
}
