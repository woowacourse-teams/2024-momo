package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.schedule.CandidateSchedule;

public interface RecommendedScheduleSorter {

    void sort(List<CandidateSchedule> unorderedSchedules);
}
