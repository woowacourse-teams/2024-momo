package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public abstract class ScheduleRecommender {

    protected final ScheduleRepository scheduleRepository;
    private final RecommendedScheduleSorterFactory recommendedScheduleSorterFactory;

    public List<CandidateSchedule> recommend(AttendeeGroup group, String recommendType) {
        List<CandidateSchedule> mergedCandidateSchedules = calcCandidateSchedules(group);
        sortSchedules(mergedCandidateSchedules, recommendType);
        return mergedCandidateSchedules.stream()
                .limit(getMaxRecommendCount())
                .toList();
    }

    private List<CandidateSchedule> calcCandidateSchedules(AttendeeGroup group) {
        List<CandidateSchedule> intersectedDateTimes = extractProperSortedDiscreteScheduleOf(group);
        return CandidateSchedule.mergeContinuousDateTime(intersectedDateTimes, this::isDiscontinuous);
    }

    abstract List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup group);

    abstract boolean isDiscontinuous(CandidateSchedule current, CandidateSchedule next);

    private void sortSchedules(List<CandidateSchedule> mergedCandidateSchedules, String recommendType) {
        RecommendedScheduleSortStandard sortStandard = RecommendedScheduleSortStandard.from(recommendType);
        RecommendedScheduleSorter sorter = recommendedScheduleSorterFactory.getSorterOf(sortStandard);
        sorter.sort(mergedCandidateSchedules);
    }

    abstract long getMaxRecommendCount();
}
