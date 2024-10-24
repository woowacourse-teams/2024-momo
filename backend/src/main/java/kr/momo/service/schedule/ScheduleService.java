package kr.momo.service.schedule;

import java.time.LocalTime;
import java.util.List;
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
import kr.momo.domain.schedule.ScheduleBatchRepository;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.schedule.dto.AttendeeScheduleResponse;
import kr.momo.service.schedule.dto.DateTimesCreateRequest;
import kr.momo.service.schedule.dto.DateTimesResponse;
import kr.momo.service.schedule.dto.RecommendedScheduleResponse;
import kr.momo.service.schedule.dto.RecommendedSchedulesResponse;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.service.schedule.dto.SchedulesResponse;
import kr.momo.service.schedule.recommend.ScheduleRecommender;
import kr.momo.service.schedule.recommend.ScheduleRecommenderFactory;
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
    private final ScheduleBatchRepository scheduleBatchRepository;
    private final ScheduleRecommenderFactory scheduleRecommenderFactory;

    @Transactional
    public void create(String uuid, long attendeeId, ScheduleCreateRequest request) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        validateMeetingUnLocked(meeting);

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));

        scheduleRepository.deleteByAttendee(attendee);
        List<Schedule> schedules = createSchedules(request, meeting, attendee);
        scheduleBatchRepository.batchInsert(schedules);
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
        AvailableDate date = availableDates.findByDate(request.toDate());
        if (meeting.isDaysOnly()) {
            return Stream.of(new Schedule(attendee, date, Timeslot.TIME_0000));
        }
        return request.toTimes().stream()
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
    public AttendeeScheduleResponse findSingleSchedule(String uuid, String attendeeName) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));

        Attendee attendee = attendeeRepository.findByMeetingAndName(meeting, new AttendeeName(attendeeName))
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.NOT_FOUND_ATTENDEE));

        List<Schedule> schedules = scheduleRepository.findAllByAttendee(attendee);
        return AttendeeScheduleResponse.of(attendee, DateTimesResponse.from(schedules));
    }

    @Transactional(readOnly = true)
    public AttendeeScheduleResponse findMySchedule(String uuid, long attendeeId) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.NOT_FOUND_ATTENDEE));

        List<Schedule> schedules = scheduleRepository.findAllByAttendee(attendee);
        return AttendeeScheduleResponse.of(attendee, DateTimesResponse.from(schedules));
    }

    @Transactional(readOnly = true)
    public RecommendedSchedulesResponse recommendSchedules(
            String uuid, String recommendType, List<String> names, int minimumTime
    ) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        AttendeeGroup attendeeGroup = new AttendeeGroup(attendeeRepository.findAllByMeeting(meeting));
        AttendeeGroup filteredGroup = attendeeGroup.filterAttendeesByName(names);

        ScheduleRecommender recommender = scheduleRecommenderFactory.getRecommenderOf(
                attendeeGroup, filteredGroup
        );
        List<CandidateSchedule> recommendedResult = recommender.recommend(
                filteredGroup, recommendType, meeting.getType(), minimumTime
        );

        List<RecommendedScheduleResponse> scheduleResponses = RecommendedScheduleResponse.fromCandidateSchedules(
                recommendedResult
        );
        return RecommendedSchedulesResponse.of(meeting.getType(), scheduleResponses);
    }
}
