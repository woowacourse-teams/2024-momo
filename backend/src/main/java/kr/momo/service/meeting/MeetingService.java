package kr.momo.service.meeting;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRawPassword;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.availabledate.AvailableDateBatchRepository;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.meeting.Type;
import kr.momo.domain.meeting.UuidGenerator;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.auth.JwtManager;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.service.meeting.dto.MeetingCreateResponse;
import kr.momo.service.meeting.dto.MeetingResponse;
import kr.momo.service.meeting.dto.MeetingSharingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private static final int MAX_UUID_GENERATION_ATTEMPTS = 5;
    private static final int SHORT_UUID_LENGTH = 8;

    private final JwtManager jwtManager;
    private final Clock clock;
    private final UuidGenerator uuidGenerator;
    private final MeetingRepository meetingRepository;
    private final AvailableDateRepository availableDateRepository;
    private final AttendeeRepository attendeeRepository;
    private final AvailableDateBatchRepository availableDateBatchRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MeetingCreateResponse create(MeetingCreateRequest request) {
        Meeting meeting = saveMeeting(
                request.meetingName(), request.toMeetingStartTime(), request.toMeetingEndTime(), request.type()
        );
        AvailableDates meetingDates = new AvailableDates(request.toAvailableMeetingDates(), meeting);

        validateNotPast(meetingDates);
        availableDateBatchRepository.batchInsert(meetingDates.getAvailableDates());
        Attendee attendee = saveHostAttendee(meeting, request.hostName(), request.hostPassword());
        String token = jwtManager.generate(attendee.getId());

        return MeetingCreateResponse.from(meeting, attendee, meetingDates, token);
    }

    private Meeting saveMeeting(String meetingName, LocalTime startTime, LocalTime endTime, Type type) {
        String uuid = generateUniqueUuid();
        Meeting meeting = new Meeting(meetingName, uuid, startTime, endTime, type);
        return meetingRepository.save(meeting);
    }

    private String generateUniqueUuid() {
        String uuid;
        int attempts = 0;

        do {
            uuid = uuidGenerator.generateUuid(SHORT_UUID_LENGTH);
            attempts++;
        } while (meetingRepository.existsByUuid(uuid) && attempts < MAX_UUID_GENERATION_ATTEMPTS);

        if (attempts >= MAX_UUID_GENERATION_ATTEMPTS) {
            throw new MomoException(MeetingErrorCode.UUID_GENERATION_FAILURE);
        }

        return uuid;
    }

    private void validateNotPast(AvailableDates meetingDates) {
        if (meetingDates.isAnyBefore(LocalDate.now(clock))) {
            throw new MomoException(MeetingErrorCode.PAST_NOT_PERMITTED);
        }
    }

    private Attendee saveHostAttendee(Meeting meeting, String hostName, String hostPassword) {
        AttendeeRawPassword rawPassword = new AttendeeRawPassword(hostPassword);
        Attendee attendee = new Attendee(meeting, hostName, rawPassword.encodePassword(passwordEncoder), Role.HOST);
        return attendeeRepository.save(attendee);
    }

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
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
