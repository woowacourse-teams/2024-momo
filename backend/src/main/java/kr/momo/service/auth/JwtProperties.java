package kr.momo.service.auth;

import jakarta.validation.constraints.NotNull;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@RequiredArgsConstructor
@ConfigurationProperties("security.jwt")
public class JwtProperties {

    @NotNull
    private final String secretKey;

    @DurationUnit(ChronoUnit.HOURS)
    private final Duration expirationPeriod;

    public long getExpirationPeriodInMillis() {
        return getExpirationPeriod().toMillis();
    }
}
