package kr.momo.service.meeting;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.auth.JwtManager;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.service.meeting.dto.MeetingCreateResponse;
import kr.momo.service.meeting.dto.MeetingResponse;
import kr.momo.service.meeting.dto.MeetingSharingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final JwtManager jwtManager;
    private final Clock clock;
    private final MeetingRepository meetingRepository;
    private final AvailableDateRepository availableDateRepository;
    private final AttendeeRepository attendeeRepository;

    @Transactional
    public MeetingCreateResponse create(MeetingCreateRequest request) {
        LocalDate today = LocalDate.now(clock);
        Meeting meeting = saveMeeting(request.meetingName(), request.meetingStartTime(), request.meetingEndTime());
        saveAvailableDates(request.availableMeetingDates(), meeting, today);

        Attendee attendee = saveHostAttendee(meeting, request.hostName(), request.hostPassword());
        String token = jwtManager.generate(attendee.getId());

        return MeetingCreateResponse.from(meeting, attendee, token);
    }

    private Meeting saveMeeting(String meetingName, LocalTime startTime, LocalTime endTime) {
        Meeting meeting = new Meeting(meetingName, UUID.randomUUID().toString(), startTime, endTime);
        return meetingRepository.save(meeting);
    }

    private void saveAvailableDates(List<LocalDate> dates, Meeting meeting, LocalDate date) {
        AvailableDates availableDates = new AvailableDates(dates, meeting);
        if (availableDates.isAnyBefore(date)) {
            throw new MomoException(MeetingErrorCode.PAST_NOT_PERMITTED);
        }
        availableDateRepository.saveAll(availableDates.getAvailableDates());
    }

    private Attendee saveHostAttendee(Meeting meeting, String hostName, String hostPassword) {
        Attendee attendee = new Attendee(meeting, hostName, hostPassword, Role.HOST);
        return attendeeRepository.save(attendee);
    }

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        AvailableDates availableDates = new AvailableDates(
                availableDateRepository.findAllByMeetingOrderByDate(meeting)
        );
        List<Attendee> attendees = attendeeRepository.findAllByMeeting(meeting);

        return MeetingResponse.of(meeting, availableDates, attendees);
    }

    @Transactional(readOnly = true)
    public MeetingSharingResponse findMeetingSharing(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        return MeetingSharingResponse.from(meeting);
    }

    @Transactional
    public void lock(String uuid, long id) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        Attendee attendee = attendeeRepository.findByIdAndMeeting(id, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.NOT_FOUND_ATTENDEE));
        validateHostPermission(attendee);
        meeting.lock();
    }

    private void validateHostPermission(Attendee attendee) {
        if (attendee.isNotHost()) {
            throw new MomoException(AttendeeErrorCode.ACCESS_DENIED);
        }
    }

    @Transactional
    public void unlock(String uuid, long id) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        Attendee attendee = attendeeRepository.findByIdAndMeeting(id, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));
        validateHostPermission(attendee);
        meeting.unlock();
    }
}
