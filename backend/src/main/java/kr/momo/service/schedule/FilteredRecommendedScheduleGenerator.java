package kr.momo.service.schedule;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateAndTimeslot;
import kr.momo.domain.schedule.DateTimeInterval;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FilteredRecommendedScheduleGenerator implements RecommendedScheduleGenerator {

    private final ScheduleRepository scheduleRepository;

    @Override
    public List<DateTimeInterval> recommend(String uuid, AttendeeGroup filteredGroup, String recommendType) {
        List<LocalDateTime> intersectedDateTimes = mapContinuousSchedulesToResponses(filteredGroup);
        List<DateTimeInterval> mergedDateTimes = DateTimeInterval.mergeContinuousDateTime(intersectedDateTimes);

        return sorted(recommendType, mergedDateTimes);
    }

    private List<LocalDateTime> mapContinuousSchedulesToResponses(AttendeeGroup filteredGroup) {
        return scheduleRepository.findAllDateAndTimeslotByEssentialAttendeeIds(
                filteredGroup.getAttendees(), filteredGroup.size()).stream()
                .map(DateAndTimeslot::toDateTime)
                .toList();
    }

    private List<DateTimeInterval> sorted(String recommendType, List<DateTimeInterval> mergedDateTimes) {
        // TODO: Comparator 추상화
        Comparator<DateTimeInterval> comparator;
        if (recommendType.equals(ScheduleRecommender.EARLIEST_ORDER.getType())) {
            comparator = Comparator.comparing(DateTimeInterval::startDateTime);
        } else {
            comparator = Comparator.comparing(DateTimeInterval::duration).reversed();
        }
        mergedDateTimes.sort(comparator);

        return mergedDateTimes;
    }
}
