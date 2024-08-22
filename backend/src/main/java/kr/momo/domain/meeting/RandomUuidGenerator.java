package kr.momo.domain.meeting;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class RandomUuidGenerator implements UuidGenerator {

    @Override
    public String generateUuid(int length) {
        return RandomStringUtils.randomAlphanumeric(length);
    }
}
