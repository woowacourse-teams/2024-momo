package kr.momo.service.schedule.recommend;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.MeetingType;
import kr.momo.domain.schedule.DateAndTimeslot;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import org.springframework.stereotype.Component;

@Component
public class FilteredScheduleRecommender extends ScheduleRecommender {

    private static final long MAXIMUM_RECOMMEND_COUNT = 5;

    public FilteredScheduleRecommender(ScheduleRepository scheduleRepository) {
        super(scheduleRepository);
    }

    @Override
    protected List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(
            AttendeeGroup filteredGroup, MeetingType type
    ) {
        return findAllScheduleAvailableByEveryAttendee(filteredGroup);
    }

    private List<CandidateSchedule> findAllScheduleAvailableByEveryAttendee(AttendeeGroup filteredGroup) {
        List<DateAndTimeslot> timeslotWithDates = scheduleRepository.findAllDateAndTimeslotByEssentialAttendees(
                filteredGroup.getAttendees()
        );
        return timeslotWithDates.stream()
                .map(datetimeSlot -> new CandidateSchedule(datetimeSlot.toDateTimeInterval(), filteredGroup))
                .toList();
    }

    @Override
    protected boolean isContinuous(CandidateSchedule current, CandidateSchedule next) {
        return current.dateTimeInterval().isSequential(next.dateTimeInterval());
    }

    @Override
    protected long getMaxRecommendCount() {
        return MAXIMUM_RECOMMEND_COUNT;
    }
}
