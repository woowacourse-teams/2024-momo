package kr.momo.domain.schedule.recommend;

import java.util.List;

@FunctionalInterface
public interface CandidateScheduleSorter {

    void sort(List<CandidateSchedule> unorderedSchedules);
}
