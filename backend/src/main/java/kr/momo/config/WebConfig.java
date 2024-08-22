package kr.momo.config;

import java.util.List;
import kr.momo.config.interceptor.JwtInterceptor;
import kr.momo.config.interceptor.LoggingInterceptor;
import kr.momo.controller.auth.AuthArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private static final String BASE_URL = "/api/v1/**";

    private final AuthArgumentResolver authArgumentResolver;
    private final JwtInterceptor jwtInterceptor;
    private final LoggingInterceptor loggingInterceptor;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(authArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor).addPathPatterns(BASE_URL).order(1);
        registry.addInterceptor(loggingInterceptor).addPathPatterns(BASE_URL).order(2);
    }
}
