package com.woowacourse.momo.service.meeting;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AvailableDateErrorCode;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import com.woowacourse.momo.service.schedule.dto.ScheduleTimeResponse;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;
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
    private final AttendeeRepository attendeeRepository;

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(IllegalArgumentException::new);

        List<AvailableDate> availableDates = availableDateRepository.findAllByMeeting(meeting);
        List<LocalDate> dates = availableDates.stream()
                .map(AvailableDate::getDate)
                .toList();

        List<Schedule> schedules = scheduleRepository.findAll();
        Map<AvailableDate, List<Schedule>> collected = schedules.stream()
                .collect(Collectors.groupingBy(Schedule::getAvailableDate));
        List<ScheduleTimeResponse> list = collected.entrySet().stream()
                .sorted(Comparator.comparing(a -> a.getKey().getDate()))
                .map(Entry::getValue)
                .map(ScheduleTimeResponse::from)
                .toList();

        return MeetingResponse.from(meeting, dates, list);
    }

    @Transactional
    public String create(MeetingCreateRequest request) {
        String uuid = UUID.randomUUID().toString();
        Meeting meeting = new Meeting(
                request.meetingName(),
                uuid,
                Timeslot.from(request.meetingStartTime()),
                Timeslot.from(request.meetingEndTime())
        );
        Meeting savedMeeting = meetingRepository.save(meeting);

        List<LocalDate> dates = request.meetingAvailableDates();
        validateDuplicatedDates(dates);
        List<AvailableDate> availableDates = dates.stream()
                .map(availableDate -> new AvailableDate(availableDate, savedMeeting))
                .toList();
        availableDateRepository.saveAll(availableDates);

        attendeeRepository.save(new Attendee(savedMeeting, request.hostName(), request.hostPassword(), Role.HOST));
        return uuid;
    }

    public MeetingSharingResponse findMeetingSharing(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        return MeetingSharingResponse.from(meeting);
    }

    private void validateDuplicatedDates(List<LocalDate> dates) {
        Set<LocalDate> dateSet = new HashSet<>(dates);
        if (dateSet.size() != dates.size()) {
            throw new MomoException(AvailableDateErrorCode.DUPLICATED_DATE);
        }
    }
}
