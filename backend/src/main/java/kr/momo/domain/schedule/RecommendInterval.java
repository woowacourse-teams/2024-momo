package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;

public interface RecommendInterval {

    boolean isSequential(RecommendInterval nextInterval);

    Duration duration();

    LocalDateTime startDateTime();

    LocalDateTime endDateTime();
}
