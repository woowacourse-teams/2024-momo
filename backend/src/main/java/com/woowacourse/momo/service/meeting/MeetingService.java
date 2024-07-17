package com.woowacourse.momo.service.meeting;

import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.schedule.dto.ScheduleTimeResponse;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final AvailableDateRepository availableDateRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(IllegalArgumentException::new);

        List<AvailableDate> availableDates = availableDateRepository.findAllByMeeting(meeting);
        List<LocalDate> dates = availableDates.stream()
                .map(AvailableDate::getDate)
                .toList();

        List<Schedule> schedules = scheduleRepository.findAllByMeeting(meeting);
        Map<AvailableDate, List<Schedule>> collected = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::getAvailableDate));
        List<ScheduleTimeResponse> list = collected.entrySet().stream()
                .sorted(Comparator.comparing(a -> a.getKey().getDate()))
                .map(Entry::getValue)
                .map(ScheduleTimeResponse::from)
                .toList();

        return MeetingResponse.from(meeting, dates, list);
    }
}
