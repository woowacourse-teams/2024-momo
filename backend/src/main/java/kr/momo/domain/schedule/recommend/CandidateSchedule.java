package kr.momo.domain.schedule.recommend;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;
import java.util.stream.Stream;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateTimeInterval;
import kr.momo.domain.schedule.RecommendInterval;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;

public record CandidateSchedule(RecommendInterval dateTimeInterval, AttendeeGroup attendeeGroup) {

    private static final int MINIMUM_MIN_SIZE = 0;

    public static CandidateSchedule of(
            LocalDateTime startDateTime, LocalDateTime endDateTime, AttendeeGroup attendeeGroup
    ) {
        return new CandidateSchedule(new DateTimeInterval(startDateTime, endDateTime), attendeeGroup);
    }

    public static List<CandidateSchedule> mergeContinuous(
            List<CandidateSchedule> sortedSchedules,
            BiPredicate<CandidateSchedule, CandidateSchedule> isContinuous,
            int minSize
    ) {
        List<CandidateSchedule> mergedSchedules = new ArrayList<>();
        int idx = 0;
        while (idx < sortedSchedules.size()) {
            int headIdx = idx;
            List<CandidateSchedule> subList = Stream.iterate(headIdx, i -> i < sortedSchedules.size(), i -> i + 1)
                    .takeWhile(i -> i == headIdx || isSequential(i, sortedSchedules, isContinuous))
                    .map(sortedSchedules::get)
                    .toList();
            addWhenLongerOrEqualThanMinTime(subList, mergedSchedules, minSize);
            idx += subList.size();
        }
        return mergedSchedules;
    }

    private static void addWhenLongerOrEqualThanMinTime(
            List<CandidateSchedule> subList, List<CandidateSchedule> mergedSchedules, int minSize
    ) {
        if (minSize < MINIMUM_MIN_SIZE) {
            throw new MomoException(ScheduleErrorCode.INVALID_MIN_TIME);
        }
        if (minSize > subList.size()) {
            return;
        }
        subList.stream()
                .reduce(CandidateSchedule::merge)
                .ifPresent(mergedSchedules::add);
    }

    private static boolean isSequential(
            int idx,
            List<CandidateSchedule> sortedSchedules,
            BiPredicate<CandidateSchedule, CandidateSchedule> isContinuous
    ) {
        CandidateSchedule prev = sortedSchedules.get(idx - 1);
        CandidateSchedule current = sortedSchedules.get(idx);
        return isContinuous.test(prev, current);
    }

    private static CandidateSchedule merge(CandidateSchedule start, CandidateSchedule end) {
        return CandidateSchedule.of(start.startDateTime(), end.endDateTime(), start.attendeeGroup());
    }

    public LocalDateTime startDateTime() {
        return dateTimeInterval.startDateTime();
    }

    public LocalDateTime endDateTime() {
        return dateTimeInterval.endDateTime();
    }

    public Duration duration() {
        return dateTimeInterval.duration();
    }

    public int groupSize() {
        return attendeeGroup.size();
    }
}
