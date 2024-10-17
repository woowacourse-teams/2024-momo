package kr.momo.service.schedule.recommend;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.MeetingType;
import kr.momo.domain.schedule.RecommendInterval;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import org.springframework.stereotype.Component;

@Component
public class TotalScheduleRecommender extends ScheduleRecommender {

    private static final long MAXIMUM_RECOMMEND_COUNT = 10;

    protected TotalScheduleRecommender(ScheduleRepository scheduleRepository) {
        super(scheduleRepository);
    }

    @Override
    protected List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup group, MeetingType type) {
        return findAllScheduleAvailableByEachAttendee(group, type);
    }

    private List<CandidateSchedule> findAllScheduleAvailableByEachAttendee(AttendeeGroup group, MeetingType type) {
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(group.getAttendees());
        Map<RecommendInterval, AttendeeGroup> groupedAttendeesByDateTimeInterval = schedules.stream()
                .collect(Collectors.groupingBy(schedule -> schedule.recommendInterval(type), Collectors.mapping(
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
    protected long getMaxRecommendCount() {
        return MAXIMUM_RECOMMEND_COUNT;
    }
}
