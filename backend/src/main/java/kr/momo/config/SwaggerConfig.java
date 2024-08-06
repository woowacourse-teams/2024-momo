package kr.momo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.customizers.RouterOperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
public class SwaggerConfig {

    @Bean
    protected ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }

    @Bean
    protected OpenAPI openAPI() {
        return new OpenAPI()
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("momo API")
                .description("momo API 입니다.");
    }

    @Bean
    public RouterOperationCustomizer appendQueryParamsToPath() {
        return (routerOperation, handlerMethod) -> {
            if (routerOperation.getParams().length > 0) {
                routerOperation.setPath(
                        routerOperation.getPath() + "?" + String.join("&", routerOperation.getParams()));
            }
            return routerOperation;
        };
    }
}
