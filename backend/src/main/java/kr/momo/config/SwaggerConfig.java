package kr.momo.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.customizers.RouterOperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {

    private final SchemaDefinitions schemaDefinitions;

    @Bean
    protected ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }

    @Bean
    protected OpenAPI openAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .components(new Components().schemas(schemaDefinitions.getSchemas()));
    }

    private Info apiInfo() {
        return new Info()
                .title("momo API")
                .description("momo API 입니다.");
    }

    @Bean
    protected RouterOperationCustomizer appendQueryParamsToPath() {
        return (routerOperation, handlerMethod) -> {
            if (routerOperation.getParams().length > 0) {
                routerOperation.setPath(
                        routerOperation.getPath() + "?" + String.join("&", routerOperation.getParams()));
            }
            return routerOperation;
        };
    }
}
