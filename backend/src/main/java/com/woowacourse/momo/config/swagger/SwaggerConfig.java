package com.woowacourse.momo.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
public class SwaggerConfig {

    private final String apiVersion;

    public SwaggerConfig(@Value("${apiVersion}") String apiVersion) {
        this.apiVersion = apiVersion;
    }

    @Bean
    protected ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }

    @Bean
    protected OpenAPI openAPI() {
        Components authComponent = new Components().addSecuritySchemes("Bearer Token", apiAuth());
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Bearer Token");

        return new OpenAPI()
                .info(apiInfo())
                .components(authComponent)
                .addSecurityItem(securityRequirement);
    }

    private SecurityScheme apiAuth() {
        return new SecurityScheme().type(Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }

    private Info apiInfo() {
        return new Info()
                .title("momo API")
                .description("momo API 입니다.")
                .version(apiVersion);
    }
}
