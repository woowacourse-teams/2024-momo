package kr.momo.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security")
@RequiredArgsConstructor
@Getter
public class CorsProperties {

    private final String[] allowOrigins;
}
