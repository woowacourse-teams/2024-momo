package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.DateAndTimeslot;
import kr.momo.domain.schedule.ScheduleRepository;
import org.springframework.stereotype.Component;

@Component
public class FilteredScheduleRecommender extends ScheduleRecommender {

    private static final long MAXIMUM_RECOMMEND_COUNT = 5;

    public FilteredScheduleRecommender(
            CandidateScheduleSorterFactory candidateScheduleSorterFactory, ScheduleRepository scheduleRepository
    ) {
        super(scheduleRepository, candidateScheduleSorterFactory);
    }

    @Override
    protected List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup filteredGroup) {
        return findAllScheduleAvailableByEveryAttendee(filteredGroup);
    }

    private List<CandidateSchedule> findAllScheduleAvailableByEveryAttendee(AttendeeGroup filteredGroup) {
        List<DateAndTimeslot> timeslotWithDates = scheduleRepository.findAllDateAndTimeslotByEssentialAttendees(
                filteredGroup.getAttendees(), filteredGroup.size()
        );
        return timeslotWithDates.stream()
                .map(datetimeSlot -> new CandidateSchedule(datetimeSlot.toDateTimeInterval(), filteredGroup))
                .toList();
    }

    @Override
    protected boolean isDiscontinuous(CandidateSchedule current, CandidateSchedule next) {
        return !current.dateTimeInterval().isSequential(next.dateTimeInterval());
    }

    @Override
    long getMaxRecommendCount() {
        return MAXIMUM_RECOMMEND_COUNT;
    }
}
