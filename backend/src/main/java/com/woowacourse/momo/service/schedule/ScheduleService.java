package com.woowacourse.momo.service.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.service.schedule.dto.DateTimesCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final MeetingRepository meetingRepository;
    private final AttendeeRepository attendeeRepository;
    private final ScheduleRepository scheduleRepository;
    private final AvailableDateRepository availableDateRepository;

    @Transactional
    public void create(ScheduleCreateRequest request) {
        Meeting meeting = meetingRepository.findById(request.meetingId())
                .orElseThrow(() -> new IllegalArgumentException("유효한 약속 id가 아닙니다."));

        AttendeeName attendeeName = new AttendeeName(request.attendeeName());
        Attendee attendee = attendeeRepository.findByName(attendeeName)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게스트입니다."));

        scheduleRepository.deleteAllByAttendee(attendee);

        List<Schedule> schedules = new ArrayList<>();
        for (DateTimesCreateRequest dateTime : request.dateTimes()) {
            AvailableDate availableDate = availableDateRepository.findByMeetingAndDate(meeting, dateTime.date())
                    .orElseThrow(() -> new IllegalArgumentException("해당 날짜에 시간을 선택할 수 없습니다."));

            schedules.addAll(dateTime.times().stream()
                    .map(time -> new Schedule(attendee, availableDate, Timeslot.from(time), Timeslot.from(time)))
                    .toList());
        }
        scheduleRepository.saveAll(schedules);
    }
}
