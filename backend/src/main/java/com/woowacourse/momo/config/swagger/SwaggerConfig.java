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

@Configuration
public class SwaggerConfig {

    @Value("${apiVersion}")
    private static String apiVersion;

    @Bean
    public OpenAPI openAPI() {
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
