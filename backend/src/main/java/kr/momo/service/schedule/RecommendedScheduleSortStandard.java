package kr.momo.service.schedule;

import java.util.Arrays;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;
import lombok.Getter;

@Getter
public enum RecommendedScheduleSortStandard {

    EARLIEST_ORDER("earliest"),
    LONG_TERM_ORDER("longTerm");

    private final String type;

    RecommendedScheduleSortStandard(String type) {
        this.type = type;
    }

    public static RecommendedScheduleSortStandard from(String type) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(type))
                .findAny()
                .orElseThrow(() -> new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_RECOMMEND_TYPE));
    }
}
