package kr.momo.service.schedule;

import java.util.Comparator;
import java.util.List;
import kr.momo.domain.schedule.CandidateSchedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EarliestFirstSorter implements RecommendedScheduleSorter {

    @Override
    public void sort(List<CandidateSchedule> unorderedSchedules) {
        Comparator<CandidateSchedule> comparator = Comparator.comparing(CandidateSchedule::groupSize, Comparator.reverseOrder())
                .thenComparing(CandidateSchedule::startDateTime);
        unorderedSchedules.sort(comparator);
    }
}
