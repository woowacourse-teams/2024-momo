package kr.momo.service.schedule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;
import kr.momo.domain.schedule.DateTimeInterval;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TotalRecommendedScheduleGenerator implements RecommendedScheduleGenerator {

    private final ScheduleRepository scheduleRepository;

    @Override
    public List<CandidateSchedule> recommend(AttendeeGroup group, String recommendType) {
        // N명 들어오면 N명~1명이 다 참여할 수 있는 스케줄 반환
        // 1차 정렬기준은 무조건 사람 수고, 2차 정렬기준이 이른 순 혹은 긴 순이어야 함.

        List<CandidateSchedule> intersectedDateTimes = mergeContinuousTime(group);
        // 같은 날짜 병합하고 정렬. 근데 같은 날짜는 이미 병합해서 나올지도?

        // 1. 같은 날짜 병합돼서 오는지 확인 (완료)
        // 2. 병합된 날짜를 정렬해서 반환 (완료)
        // 3. endTime에 30분 더해서 줘야 됨 (완료)
        return sorted(recommendType, intersectedDateTimes);
    }

    private List<CandidateSchedule> mergeContinuousTime(AttendeeGroup group) {
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(group.getAttendees());

        if (schedules.isEmpty()) {
            return Collections.emptyList();
        }

        // TODO: 쿼리로 처리하는 것 고려
        Map<DateTimeInterval, AttendeeGroup> dateTimeAttendeeGroupMap = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::dateTimeInterval, Collectors.mapping(
                                Schedule::getAttendee,
                                Collectors.collectingAndThen(Collectors.toList(), AttendeeGroup::new)
                        ))
                );

        // 정렬된 Map을 순차적으로 탐색하면서 연속된 시간대를 찾음
        List<DateTimeInterval> sortedDateTimes = dateTimeAttendeeGroupMap.keySet().stream()
                .sorted(Comparator.comparing(DateTimeInterval::startDateTime))
                .toList();

        List<CandidateSchedule> responses = new ArrayList<>();

        DateTimeInterval startTime = sortedDateTimes.get(0);
        AttendeeGroup startGroup = dateTimeAttendeeGroupMap.get(startTime);
        DateTimeInterval currentTime = startTime;
        AttendeeGroup currentGroup = startGroup;

        for (int i = 1; i < sortedDateTimes.size(); i++) {
            DateTimeInterval nextTime = sortedDateTimes.get(i);
            AttendeeGroup nextGroup = dateTimeAttendeeGroupMap.get(nextTime);

            if (isDiscontinuous(currentTime, nextTime, currentGroup, nextGroup)) {
                responses.add(CandidateSchedule.of(startTime.startDateTime(), currentTime.endDateTime(), startGroup));
                startTime = nextTime;
                startGroup = nextGroup;
            }
            currentTime = nextTime;
            currentGroup = nextGroup;
        }
        responses.add(CandidateSchedule.of(startTime.startDateTime(), currentTime.endDateTime(), startGroup));

        return responses;
    }


    private boolean isDiscontinuous(
            DateTimeInterval now, DateTimeInterval next, AttendeeGroup currentGroup, AttendeeGroup nextGroup
    ) {
        boolean isSameGroup = currentGroup.equals(nextGroup);
        boolean isSequential = now.isSequential(next);
        return !(isSameGroup && isSequential);
    }

    private List<CandidateSchedule> sorted(String recommendType, List<CandidateSchedule> mergedDateTimes) {
        // TODO: Comparator 추상화
        Comparator<CandidateSchedule> comparator;
        if (recommendType.equals(ScheduleRecommender.EARLIEST_ORDER.getType())) {
            comparator = Comparator.comparing(CandidateSchedule::groupSize, Comparator.reverseOrder())
                    .thenComparing(CandidateSchedule::startDateTime);
        } else {
            comparator = Comparator.comparing(CandidateSchedule::groupSize, Comparator.reverseOrder())
                    .thenComparing(CandidateSchedule::duration, Comparator.reverseOrder());
        }
        mergedDateTimes.sort(comparator);

        return mergedDateTimes;
    }
}
