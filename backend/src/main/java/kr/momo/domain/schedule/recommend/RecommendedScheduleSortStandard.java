package kr.momo.domain.schedule.recommend;

import java.util.Arrays;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;
import lombok.Getter;

@Getter
public enum RecommendedScheduleSortStandard {

    EARLIEST_ORDER("earliest", new EarliestFirstSorter()),
    LONG_TERM_ORDER("longTerm", new LongTermFirstSorter());

    private final String type;
    private final CandidateScheduleSorter sorter;

    RecommendedScheduleSortStandard(String type, CandidateScheduleSorter sorter) {
        this.type = type;
        this.sorter = sorter;
    }

    public static RecommendedScheduleSortStandard from(String type) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(type))
                .findAny()
                .orElseThrow(() -> new MomoException(ScheduleErrorCode.INVALID_SCHEDULE_RECOMMEND_TYPE));
    }
}
