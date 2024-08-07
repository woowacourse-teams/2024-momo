package kr.momo.service.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Comparator;
import java.util.function.Function;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;
import kr.momo.service.schedule.dto.RecommendedScheduleResponse;
import lombok.Getter;

@Getter
public enum ScheduleRecommender {

    EARLIEST_ORDER("earliest", descendingByAttendees().thenComparing(ascendingByDateTime())),
    LONG_TERM_ORDER("longTerm", descendingByAttendees().thenComparing(descendingByDateTimeInterval()));

    private final String type;
    private final Comparator<RecommendedScheduleResponse> comparator;

    ScheduleRecommender(String type, Comparator<RecommendedScheduleResponse> comparator) {
        this.type = type;
        this.comparator = comparator;
    }

    public static ScheduleRecommender from(String type) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(type))
                .findAny()
                .orElseThrow(() -> new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_RECOMMEND_TYPE));
    }

    private static Comparator<RecommendedScheduleResponse> descendingByAttendees() {
        return Comparator.comparingInt((RecommendedScheduleResponse r) -> r.attendeeNames().size())
                .reversed();
    }

    private static Function<RecommendedScheduleResponse, LocalDateTime> ascendingByDateTime() {
        return response -> LocalDateTime.of(response.startDate(), response.startTime());
    }

    private static Comparator<RecommendedScheduleResponse> descendingByDateTimeInterval() {
        return (r1, r2) -> {
            Duration duration1 = Duration.between(r1.startDateTime(), r1.endDateTime());
            Duration duration2 = Duration.between(r2.startDateTime(), r2.endDateTime());
            return duration2.compareTo(duration1);
        };
    }
}
