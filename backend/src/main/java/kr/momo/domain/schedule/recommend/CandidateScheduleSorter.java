package kr.momo.domain.schedule.recommend;

import java.util.List;

public interface CandidateScheduleSorter {

    void sort(List<CandidateSchedule> unorderedSchedules);
}
