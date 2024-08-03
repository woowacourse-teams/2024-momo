package kr.momo.service.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import kr.momo.service.schedule.dto.ScheduleRecommendResponse;
import lombok.Getter;

@Getter
public enum ScheduleRecommender {

    ATTENDEE_COUNT(
            "attendCount",
            Comparator.comparingInt((ScheduleRecommendResponse r) -> r.attendeeNames().size()).reversed()
    ),
    EARLIEST_ORDER(
            "earliest",
            ATTENDEE_COUNT.comparator.thenComparing(
                    response -> LocalDateTime.of(response.date(), response.startTime())
            )
    ),
    LONG_TERM_ORDER(
            "longTerm",
            ATTENDEE_COUNT.comparator.thenComparing(
            (r1, r2) -> {
                Duration duration1 = Duration.between(r1.startTime(), r1.endTime());
                Duration duration2 = Duration.between(r2.startTime(), r2.endTime());
                return duration2.compareTo(duration1);
            })
    );

    private final String type;
    private final Comparator<ScheduleRecommendResponse> comparator;

    ScheduleRecommender(String type, Comparator<ScheduleRecommendResponse> comparator) {
        this.type = type;
        this.comparator = comparator;
    }

    public static ScheduleRecommender from(String type) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(type))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }
}
