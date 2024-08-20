package kr.momo.service.schedule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
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
        List<CandidateSchedule> intersectedDateTimes = findAllScheduleAvailableByEveryAttendee(filteredGroup);
        List<CandidateSchedule> mergedDateTimes = mergeContinuousDateTime(intersectedDateTimes);

        return sorted(recommendType, mergedDateTimes);
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
        if (sortedSchedules.isEmpty()) {
            return Collections.emptyList();
        }

        Iterator<CandidateSchedule> iterator = sortedSchedules.iterator();

        List<CandidateSchedule> responses = new ArrayList<>();
        CandidateSchedule startDateTime = iterator.next();
        CandidateSchedule currentDateTime = startDateTime;

        while (iterator.hasNext()) {
            CandidateSchedule nextDateTime = iterator.next();

            if (isDiscontinuous(currentDateTime, nextDateTime)) {
                responses.add(CandidateSchedule.of(startDateTime.startDateTime(), currentDateTime.endDateTime(),
                        startDateTime.attendeeGroup()));
                startDateTime = nextDateTime;
            }
            currentDateTime = nextDateTime;
        }
        responses.add(CandidateSchedule.of(startDateTime.startDateTime(), currentDateTime.endDateTime(),
                startDateTime.attendeeGroup()));
        return responses;
    }

    private boolean isDiscontinuous(CandidateSchedule now, CandidateSchedule next) {
        return !now.dateTimeInterval().isSequential(next.dateTimeInterval());
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
