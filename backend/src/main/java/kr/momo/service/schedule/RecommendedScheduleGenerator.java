package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public abstract class RecommendedScheduleGenerator {

    protected final ScheduleRepository scheduleRepository;
    private final RecommendedScheduleSorterFactory recommendedScheduleSorterFactory;

    public List<CandidateSchedule> recommend(AttendeeGroup group, String recommendType) {
        List<CandidateSchedule> intersectedDateTimes = extractProperSortedDiscreteScheduleOf(group);
        List<CandidateSchedule> mergedCandidateSchedules = CandidateSchedule.mergeContinuousDateTime(
                intersectedDateTimes, this::isDiscontinuous
        );

        RecommendedScheduleSortStandard sortStandard = RecommendedScheduleSortStandard.from(recommendType);
        RecommendedScheduleSorter sorter = recommendedScheduleSorterFactory.getSorterOf(sortStandard);
        sorter.sort(mergedCandidateSchedules);

        return mergedCandidateSchedules;
    }

    abstract List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup group);

    abstract boolean isDiscontinuous(CandidateSchedule current, CandidateSchedule next);
}
