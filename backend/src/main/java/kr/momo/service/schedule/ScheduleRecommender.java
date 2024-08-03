package kr.momo.service.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;
import kr.momo.service.schedule.dto.ScheduleRecommendResponse;
import lombok.Getter;

@Getter
public enum ScheduleRecommender {

    EARLIEST_ORDER(
            "earliest",
            descendingByAttendees().thenComparing(response -> LocalDateTime.of(response.date(), response.startTime())
            )
    ),
    LONG_TERM_ORDER(
            "longTerm",
            descendingByAttendees().thenComparing((r1, r2) -> {
                Duration duration1 = Duration.between(r1.startTime(), r1.endTime());
                Duration duration2 = Duration.between(r2.startTime(), r2.endTime());
                return duration2.compareTo(duration1);
            })
    );

    private static Comparator<ScheduleRecommendResponse> descendingByAttendees() {
        return Comparator.comparingInt((ScheduleRecommendResponse r) -> r.attendeeNames().size())
                .reversed();
    }

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
                .orElseThrow(() -> new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_RECOMMEND_TYPE));
    }
}
