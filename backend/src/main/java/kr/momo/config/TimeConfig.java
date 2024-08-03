package kr.momo.config;

import java.time.Clock;
import java.time.ZoneId;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TimeConfig {

    private static final ZoneId CLOCK_TIME_ZONE = ZoneId.of("Asia/Seoul");

    @Bean
    public Clock clock() {
        return Clock.system(CLOCK_TIME_ZONE);
    }
}
