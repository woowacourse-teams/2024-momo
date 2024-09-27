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

    protected final ScheduleRepository scheduleRepository;

    public List<CandidateSchedule> recommend(AttendeeGroup group, String recommendType, MeetingType meetingType) {
        List<CandidateSchedule> mergedCandidateSchedules = calcCandidateSchedules(group, meetingType);
        sortSchedules(mergedCandidateSchedules, recommendType);
        return mergedCandidateSchedules.stream()
                .limit(getMaxRecommendCount())
                .toList();
    }

    private List<CandidateSchedule> calcCandidateSchedules(AttendeeGroup group, MeetingType type) {
        List<CandidateSchedule> intersectedDateTimes = extractProperSortedDiscreteScheduleOf(group, type);
        return CandidateSchedule.mergeContinuous(intersectedDateTimes, this::isContinuous);
    }

    abstract List<CandidateSchedule> extractProperSortedDiscreteScheduleOf(AttendeeGroup group, MeetingType type);

    abstract boolean isContinuous(CandidateSchedule current, CandidateSchedule next);

    private void sortSchedules(List<CandidateSchedule> mergedCandidateSchedules, String recommendType) {
        RecommendedScheduleSortStandard sortStandard = RecommendedScheduleSortStandard.from(recommendType);
        CandidateScheduleSorter sorter = sortStandard.getSorter();
        sorter.sort(mergedCandidateSchedules);
    }

    abstract long getMaxRecommendCount();
}
