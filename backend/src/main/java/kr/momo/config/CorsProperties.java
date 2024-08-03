package kr.momo.config;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "security")
@Getter
@Validated
public class CorsProperties {

    @NotNull
    private final String[] allowOrigins;

    @ConstructorBinding
    public CorsProperties(String[] allowOrigins) {
        this.allowOrigins = allowOrigins;
    }
}
