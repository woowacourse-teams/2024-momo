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
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.service.schedule.dto.DateWithTimesRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleDateTimesResponse;
import com.woowacourse.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import com.woowacourse.momo.service.schedule.dto.SchedulesResponse;
import java.time.LocalTime;
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
    public void create(String uuid, ScheduleCreateRequest request) {
        Meeting meeting = findMeetingByUUID(uuid);
        Attendee attendee = findAttendeeByMeetingAndName(meeting, request.attendeeName());

        scheduleRepository.deleteAllByAttendee(attendee);
        List<Schedule> schedules = createSchedules(request, meeting, attendee);
        scheduleRepository.saveAll(schedules);
    }

    private Meeting findMeetingByUUID(String uuid) {
        return meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
    }

    private Attendee findAttendeeByMeetingAndName(Meeting meeting, String attendeeName) {
        AttendeeName name = new AttendeeName(attendeeName);
        return attendeeRepository.findByMeetingAndName(meeting, name)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));
    }

    private List<Schedule> createSchedules(ScheduleCreateRequest request, Meeting meeting, Attendee attendee) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        return request.dateTimes().stream()
                .flatMap(dateTimeRequest -> createSchedulesForDate(meeting, attendee, availableDates, dateTimeRequest))
                .toList();
    }

    private Stream<Schedule> createSchedulesForDate(
            Meeting meeting, Attendee attendee, AvailableDates availableDates, DateWithTimesRequest request
    ) {
        AvailableDate date = availableDates.findByDate(request.date());
        return request.times().stream()
                .map(time -> createSchedule(meeting, attendee, date, time));
    }

    private Schedule createSchedule(Meeting meeting, Attendee attendee, AvailableDate availableDate, LocalTime time) {
        Timeslot timeslot = meeting.getValidatedTimeslot(time);
        return new Schedule(attendee, availableDate, timeslot);
    }

    @Transactional(readOnly = true)
    public SchedulesResponse findAllSchedules(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        List<Attendee> attendees = attendeeRepository.findAllByMeeting(meeting);
        List<Schedule> schedules = findAllSchedules(attendees);

        return SchedulesResponse.from(schedules);
    }

    private List<Schedule> findAllSchedules(List<Attendee> attendees) {
        return attendees.stream()
                .flatMap(attendee -> scheduleRepository.findAllByAttendee(attendee).stream())
                .toList();
    }

    @Transactional(readOnly = true)
    public ScheduleOneAttendeeResponse findSingleSchedule(String uuid, String attendeeName) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));

        Attendee attendee = attendeeRepository.findByMeetingAndName(meeting, new AttendeeName(attendeeName))
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.NOT_FOUND_ATTENDEE));

        List<Schedule> schedules = scheduleRepository.findAllByAttendee(attendee);
        return ScheduleOneAttendeeResponse.of(attendee, ScheduleDateTimesResponse.from(schedules));
    }
}
