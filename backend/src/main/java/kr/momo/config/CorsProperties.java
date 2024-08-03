package kr.momo.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security")
@Getter
public class CorsProperties {

    private final String[] allowOrigins;

    public CorsProperties(String[] allowOrigins) {
        this.allowOrigins = allowOrigins;
    }
}
