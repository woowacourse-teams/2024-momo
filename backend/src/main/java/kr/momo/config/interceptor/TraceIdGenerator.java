package kr.momo.config.interceptor;

import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class TraceIdGenerator {

    public String generateShortUuid() {
        return UUID.randomUUID().toString().split("-", 2)[0];
    }
}
