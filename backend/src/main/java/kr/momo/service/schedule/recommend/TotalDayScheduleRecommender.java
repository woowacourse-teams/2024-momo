package kr.momo.service.schedule.recommend;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateTimeInterval;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import org.springframework.stereotype.Component;

@Component
public class TotalDayScheduleRecommender extends ScheduleRecommender {

    private static final long MAXIMUM_RECOMMEND_COUNT = 10;

    public TotalDayScheduleRecommender(ScheduleRepository scheduleRepository) {
        super(scheduleRepository);
    }

    @Override
    protected List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup group) {
        return findAllScheduleAvailableByEachAttendee(group);
    }

    private List<CandidateSchedule> findAllScheduleAvailableByEachAttendee(AttendeeGroup group) {
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(group.getAttendees());
        Map<DateTimeInterval, AttendeeGroup> groupedAttendeesByDateTimeInterval = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::dateInterval, Collectors.mapping(
                                Schedule::getAttendee,
                                Collectors.collectingAndThen(Collectors.toList(), AttendeeGroup::new)
                        ))
                );
        return groupedAttendeesByDateTimeInterval.entrySet().stream()
                .map(entry -> new CandidateSchedule(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparing(CandidateSchedule::startDateTime))
                .toList();
    }

    @Override
    protected boolean isContinuous(CandidateSchedule current, CandidateSchedule next) {
        AttendeeGroup currentGroup = current.attendeeGroup();
        AttendeeGroup nextGroup = next.attendeeGroup();
        boolean isSameGroup = currentGroup.equals(nextGroup);
        boolean isSequential = current.dateTimeInterval().isSequential(next.dateTimeInterval());
        return isSameGroup && isSequential;
    }

    @Override
    long getMaxRecommendCount() {
        return MAXIMUM_RECOMMEND_COUNT;
    }
}
