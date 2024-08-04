package kr.momo.service.schedule;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
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
import kr.momo.service.schedule.dto.SchedulesRecommendResponse;
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
    public SchedulesRecommendResponse recommendSchedules(String uuid, String recommendType, List<String> names) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));

        AttendeeGroup allAttendeeGroup = new AttendeeGroup(attendeeRepository.findAllByMeeting(meeting));
        AttendeeGroup filteredAttendeeGroup = allAttendeeGroup.filterAttendeesByName(names);
        List<AttendeeGroup> groupCombinations = filteredAttendeeGroup.findAttendeeGroupCombination();

        List<ScheduleRecommendResponse> recommendResponses = new ArrayList<>();
        for (AttendeeGroup group : groupCombinations) {
            List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(group.getAttendees());
            List<ScheduleRecommendResponse> recommendResponse = groupingScheduleByAttendees(schedules);
            List<ScheduleRecommendResponse> response = sortedAndFilterByRecommendType(
                    recommendType, group.size(), recommendResponse
            );
            recommendResponses.addAll(response);
        }

        return SchedulesRecommendResponse.of(allAttendeeGroup, recommendResponses);
    }

    private List<ScheduleRecommendResponse> sortedAndFilterByRecommendType(
            String recommendType, int groupSize, List<ScheduleRecommendResponse> scheduleRecommendResponses
    ) {
        return scheduleRecommendResponses.stream()
                .filter(response -> response.attendeeNames().size() == groupSize)
                .sorted(ScheduleRecommender.from(recommendType).getComparator())
                .toList();
    }

    private List<ScheduleRecommendResponse> groupingScheduleByAttendees(List<Schedule> schedules) {
        if (schedules.isEmpty()) {
            return Collections.emptyList();
        }

        Map<LocalDateTime, AttendeeGroup> attendeeByDateTime = groupAttendeeByDateTime(schedules);
        List<LocalDateTime> sortedDateTimes = attendeeByDateTime.keySet().stream()
                .sorted()
                .toList();

        LocalDateTime startTime = sortedDateTimes.get(0);
        AttendeeGroup startNames = attendeeByDateTime.get(startTime);

        LocalDateTime now = startTime;
        AttendeeGroup nowNames = startNames;

        List<ScheduleRecommendResponse> responses = new ArrayList<>();
        for (int i = 1; i < sortedDateTimes.size(); i++) {
            LocalDateTime next = sortedDateTimes.get(i);
            AttendeeGroup nextNames = attendeeByDateTime.get(next);
            if (isDiscontinuousDateTime(now, next, nowNames, nextNames)) {
                responses.add(ScheduleRecommendResponse.of(startTime, now, startNames));
                startTime = next;
                startNames = nextNames;
            }
            now = next;
            nowNames = nextNames;
        }
        responses.add(ScheduleRecommendResponse.of(startTime, now, startNames));
        return responses;
    }

    private Map<LocalDateTime, AttendeeGroup> groupAttendeeByDateTime(List<Schedule> schedules) {
        return schedules.stream()
                .collect(groupingBy(Schedule::dateTime,
                        mapping(Schedule::getAttendee, collectingAndThen(toList(), AttendeeGroup::new)))
                );
    }

    private boolean isDiscontinuousDateTime(
            LocalDateTime now, LocalDateTime next, AttendeeGroup nowAttendeeGroup, AttendeeGroup nextAttendeeGroup
    ) {
        return !(now.plusMinutes(30).equals(next) && nowAttendeeGroup.size() == nextAttendeeGroup.size());
    }
}
