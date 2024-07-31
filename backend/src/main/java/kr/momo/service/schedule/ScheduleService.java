package kr.momo.service.schedule;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.schedule.dto.DateTimesCreateRequest;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.ScheduleDateTimesResponse;
import kr.momo.service.schedule.dto.ScheduleOneAttendeeResponse;
import kr.momo.service.schedule.dto.ScheduleRecommendResponse;
import kr.momo.service.schedule.dto.SchedulesResponse;
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
    public void create(String uuid, long attendeeId, ScheduleCreateRequest request) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        validateMeetingUnLocked(meeting);

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));

        scheduleRepository.deleteAllByAttendee(attendee);
        List<Schedule> schedules = createSchedules(request, meeting, attendee);
        scheduleRepository.saveAll(schedules);
    }

    private void validateMeetingUnLocked(Meeting meeting) {
        if (meeting.isLocked()) {
            throw new MomoException(MeetingErrorCode.MEETING_LOCKED);
        }
    }

    private List<Schedule> createSchedules(ScheduleCreateRequest request, Meeting meeting, Attendee attendee) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        return request.dateTimes().stream()
                .flatMap(dateTimeRequest -> createSchedulesForDate(meeting, attendee, availableDates, dateTimeRequest))
                .toList();
    }

    private Stream<Schedule> createSchedulesForDate(
            Meeting meeting, Attendee attendee, AvailableDates availableDates, DateTimesCreateRequest request
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
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(attendees);

        return SchedulesResponse.from(schedules);
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

    @Transactional(readOnly = true)
    public ScheduleOneAttendeeResponse findMySchedule(String uuid, long attendeeId) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.NOT_FOUND_ATTENDEE));

        List<Schedule> schedules = scheduleRepository.findAllByAttendee(attendee);
        return ScheduleOneAttendeeResponse.of(attendee, ScheduleDateTimesResponse.from(schedules));
    }

    @Transactional(readOnly = true)
    public List<ScheduleRecommendResponse> recommendSchedules(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        List<Attendee> attendees = attendeeRepository.findAllByMeeting(meeting);
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(attendees);

        Map<LocalDateTime, List<String>> map = schedules.stream()
                .collect(groupingBy(Schedule::dateTime, mapping(Schedule::attendeeName, toList())));
        List<LocalDateTime> localDateTimes = map.keySet().stream().sorted().toList();


        List<ScheduleRecommendResponse> responses = new ArrayList<>();
        LocalDateTime startTime = localDateTimes.get(0);
        List<String> startNames = map.get(startTime);

        LocalDateTime now = startTime;
        List<String> nowNames = startNames;
        for (int i = 1; i < localDateTimes.size(); i++) {
            LocalDateTime next = localDateTimes.get(i);
            List<String> nextNames = map.get(next);
            if (!(now.plusMinutes(30).equals(next) && isSameNames(nowNames, nextNames))) {
                responses.add(ScheduleRecommendResponse.from(startTime, now, startNames));
                startTime = next;
                startNames = nextNames;
            }
            now = next;
            nowNames = nextNames;
        }
        responses.add(ScheduleRecommendResponse.from(startTime, now, startNames));

        return responses;
    }

    private boolean isSameNames(List<String> names1, List<String> names2) {
        Set<String> collect = names1.stream().collect(Collectors.toSet());
        Set<String> collect1 = names2.stream().collect(Collectors.toSet());
        return collect.equals(collect1);
    }
}
