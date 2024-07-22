package com.woowacourse.momo.service.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDates;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.TimeslotInterval;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.service.schedule.dto.DateWithTimesRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import java.util.List;
import java.util.stream.Stream;
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
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        AttendeeName attendeeName = new AttendeeName(request.attendeeName());

        Attendee attendee = attendeeRepository.findByMeetingAndName(meeting, attendeeName)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));

        scheduleRepository.deleteAllByAttendee(attendee);
        scheduleRepository.saveAll(generateSchedules(request, meeting, attendee));
    }

    private List<Schedule> generateSchedules(ScheduleCreateRequest request, Meeting meeting, Attendee attendee) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        return request.dateTimes().stream()
                .flatMap(datetime -> createSchedulesForDate(datetime, availableDates, meeting, attendee))
                .toList();
    }

    private Stream<Schedule> createSchedulesForDate(
            DateWithTimesRequest request, AvailableDates availableDates, Meeting meeting, Attendee attendee
    ) {
        AvailableDate availableDate = availableDates.findByDate(request.date());
        return TimeslotInterval.generate(request.times()).stream()
                .map(interval -> createValidSchedule(availableDate, interval, meeting, attendee));
    }

    private Schedule createValidSchedule(
            AvailableDate availableDate, TimeslotInterval interval, Meeting meeting, Attendee attendee
    ) {
        meeting.validateTimeslotInterval(interval);
        return new Schedule(attendee, availableDate, interval);
    }
}
