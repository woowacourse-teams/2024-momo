package kr.momo.config.filter;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class FilterConfig {

    private static final String BASE_URL = "/api/v1/*";
    private static final int FIRST_ORDER = 0;

    private final TraceIdGenerator traceIdGenerator;
    private final LogGenerator logGenerator;

    @Bean
    public FilterRegistrationBean<Filter> logFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();

        filterRegistrationBean.setFilter(new LogFilter(traceIdGenerator, logGenerator));
        filterRegistrationBean.addUrlPatterns(BASE_URL);
        filterRegistrationBean.setOrder(FIRST_ORDER);

        return filterRegistrationBean;
    }
}
