package com.woowacourse.momo.service.schedule;

import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.guest.Guest;
import com.woowacourse.momo.domain.guest.GuestName;
import com.woowacourse.momo.domain.guest.GuestRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.service.schedule.dto.DateTimesCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ScheduleService {

    private final MeetingRepository meetingRepository;
    private final GuestRepository guestRepository;
    private final ScheduleRepository scheduleRepository;
    private final AvailableDateRepository availableDateRepository;

    @Transactional
    public void create(ScheduleCreateRequest request) {
        Meeting meeting = meetingRepository.findById(request.meetingId())
                .orElseThrow(() -> new IllegalArgumentException("유효한 약속 id가 아닙니다."));

        GuestName guestName = new GuestName(request.guestName());
        Guest guest = guestRepository.findByName(guestName)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게스트입니다."));

        scheduleRepository.deleteAllByMeetingAndGuest(meeting, guest);

        List<Schedule> schedules = new ArrayList<>();
        for (DateTimesCreateRequest dateTime : request.dateTimes()) {
            AvailableDate availableDate = availableDateRepository.findByMeetingAndDate(meeting, dateTime.date())
                    .orElseThrow(() -> new IllegalArgumentException("해당 날짜에 시간을 선택할 수 없습니다."));

            schedules.addAll(dateTime.times().stream()
                    .map(time -> new Schedule(meeting, guest, Timeslot.from(time), availableDate))
                    .toList());
        }
        scheduleRepository.saveAll(schedules);
    }
}
