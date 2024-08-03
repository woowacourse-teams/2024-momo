package kr.momo.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

@ConfigurationProperties(prefix = "security")
@Getter
public class CorsProperties {

    private final String[] allowOrigins;

    @ConstructorBinding
    public CorsProperties(String[] allowOrigins) {
        this.allowOrigins = allowOrigins;
    }
}
