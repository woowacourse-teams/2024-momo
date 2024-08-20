package kr.momo.service.schedule;

import java.util.Comparator;
import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FilteredRecommendedScheduleGenerator implements RecommendedScheduleGenerator {

    private final ScheduleRepository scheduleRepository;

    @Override
    public List<CandidateSchedule> recommend(AttendeeGroup filteredGroup, String recommendType) {
        List<CandidateSchedule> intersectedDateTimes = findAllDateTimeAvailableByEveryAttendee(filteredGroup);
        List<CandidateSchedule> mergedDateTimes = CandidateSchedule.mergeContinuousDateTime(intersectedDateTimes);

        return sorted(recommendType, mergedDateTimes);
    }

    private List<CandidateSchedule> findAllDateTimeAvailableByEveryAttendee(AttendeeGroup filteredGroup) {
        return scheduleRepository.findAllDateAndTimeslotByEssentialAttendees(
                        filteredGroup.getAttendees(), filteredGroup.size()).stream()
                .map(datetimeSlot -> new CandidateSchedule(datetimeSlot.toDateTimeInterval(), filteredGroup))
                .toList();
    }

    private List<CandidateSchedule> sorted(String recommendType, List<CandidateSchedule> mergedDateTimes) {
        // TODO: Comparator 추상화
        Comparator<CandidateSchedule> comparator;
        if (recommendType.equals(ScheduleRecommender.EARLIEST_ORDER.getType())) {
            comparator = Comparator.comparing(CandidateSchedule::startDateTime);
        } else {
            comparator = Comparator.comparing(CandidateSchedule::duration).reversed();
        }
        mergedDateTimes.sort(comparator);

        return mergedDateTimes;
    }
}
