package kr.momo.service.schedule;

import java.time.LocalDateTime;
import java.util.Comparator;
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

    @Override
    public List<CandidateSchedule> recommend(AttendeeGroup filteredGroup, String recommendType) {
        List<LocalDateTime> intersectedDateTimes = mergeContinuousTime(filteredGroup);

        // TODO: CandidateSchedule에 group 정보를 어디서 넣어줄 것인가?
        List<CandidateSchedule> mergedDateTimes = CandidateSchedule.mergeContinuousDateTime(intersectedDateTimes, filteredGroup);

        return sorted(recommendType, mergedDateTimes);
    }

    private List<LocalDateTime> mergeContinuousTime(AttendeeGroup filteredGroup) {
        return scheduleRepository.findAllDateAndTimeslotByEssentialAttendeeIds(
                        filteredGroup.getAttendees(), filteredGroup.size()).stream()
                .map(DateAndTimeslot::toDateTime)
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
