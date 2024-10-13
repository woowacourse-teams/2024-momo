package kr.momo.service.schedule.recommend;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.MeetingType;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import kr.momo.domain.schedule.recommend.CandidateScheduleSorter;
import kr.momo.domain.schedule.recommend.RecommendedScheduleSortStandard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public abstract class ScheduleRecommender {

    private static final int HALF_HOUR_INTERVAL = 30;

    protected final ScheduleRepository scheduleRepository;

    public List<CandidateSchedule> recommend(
            AttendeeGroup group, String recommendType, MeetingType meetingType, int minTime
    ) {
        int minSize = minTime / HALF_HOUR_INTERVAL;
        List<CandidateSchedule> mergedCandidateSchedules = calcCandidateSchedules(group, meetingType, minSize);
        sortSchedules(mergedCandidateSchedules, recommendType);
        return mergedCandidateSchedules.stream()
                .limit(getMaxRecommendCount())
                .toList();
    }

    private List<CandidateSchedule> calcCandidateSchedules(AttendeeGroup group, MeetingType type, int minSize) {
        List<CandidateSchedule> intersectedDateTimes = extractProperSortedDiscreteScheduleOf(group, type);
        return CandidateSchedule.mergeContinuous(intersectedDateTimes, this::isContinuous, minSize);
    }

    private void sortSchedules(List<CandidateSchedule> mergedCandidateSchedules, String recommendType) {
        RecommendedScheduleSortStandard sortStandard = RecommendedScheduleSortStandard.from(recommendType);
        CandidateScheduleSorter sorter = sortStandard.getSorter();
        sorter.sort(mergedCandidateSchedules);
    }

    protected abstract List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(
            AttendeeGroup group, MeetingType type
    );

    protected abstract boolean isContinuous(CandidateSchedule current, CandidateSchedule next);

    protected abstract long getMaxRecommendCount();
}
