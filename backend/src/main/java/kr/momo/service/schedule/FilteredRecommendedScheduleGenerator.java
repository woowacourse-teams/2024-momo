package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.DateAndTimeslot;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FilteredRecommendedScheduleGenerator implements RecommendedScheduleGenerator {

    private final ScheduleRepository scheduleRepository;
    private final RecommendedScheduleSorterFactory recommendedScheduleSorterFactory;

    @Override
    public List<CandidateSchedule> recommend(AttendeeGroup filteredGroup, String recommendType) {
        List<CandidateSchedule> intersectedDateTimes = findAllScheduleAvailableByEveryAttendee(filteredGroup);
        List<CandidateSchedule> mergedDateTimes = mergeContinuousDateTime(intersectedDateTimes);
        sort(recommendType, mergedDateTimes);

        return mergedDateTimes;
    }

    private List<CandidateSchedule> findAllScheduleAvailableByEveryAttendee(AttendeeGroup filteredGroup) {
        List<DateAndTimeslot> timeslotWithDates = scheduleRepository.findAllDateAndTimeslotByEssentialAttendees(
                filteredGroup.getAttendees(), filteredGroup.size()
        );
        return timeslotWithDates.stream()
                .map(datetimeSlot -> new CandidateSchedule(datetimeSlot.toDateTimeInterval(), filteredGroup))
                .toList();
    }

    private List<CandidateSchedule> mergeContinuousDateTime(List<CandidateSchedule> sortedSchedules) {
        return CandidateSchedule.mergeContinuousDateTime(sortedSchedules, this::isDiscontinuous);
    }

    private boolean isDiscontinuous(CandidateSchedule now, CandidateSchedule next) {
        return !now.dateTimeInterval().isSequential(next.dateTimeInterval());
    }

    private void sort(String recommendType, List<CandidateSchedule> mergedDateTimes) {
        RecommendedScheduleSortStandard sortStandard = RecommendedScheduleSortStandard.from(recommendType);
        recommendedScheduleSorterFactory.getSorterOf(sortStandard).sort(mergedDateTimes);
    }
}
