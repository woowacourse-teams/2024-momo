package kr.momo.service.meeting;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.ConfirmedMeetingRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.meeting.dto.ConfirmedMeetingResponse;
import kr.momo.service.meeting.dto.MeetingConfirmRequest;
import kr.momo.service.meeting.dto.MeetingConfirmResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingConfirmService {

    private final MeetingRepository meetingRepository;
    private final AttendeeRepository attendeeRepository;
    private final AvailableDateRepository availableDateRepository;
    private final ConfirmedMeetingRepository confirmedMeetingRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public MeetingConfirmResponse create(String uuid, long attendeeId, MeetingConfirmRequest request) {
        LocalDateTime startDateTime = LocalDateTime.of(request.startDate(), request.startTime());
        LocalDateTime endDateTime = LocalDateTime.of(request.endDate(), request.endTime());

        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));

        validateHostPermission(attendee);
        validateNotAlreadyConfirmed(meeting);
        validateMeetingLocked(meeting);
        validateTimeRange(meeting, startDateTime, endDateTime);
        validateDateRange(meeting, startDateTime, endDateTime);

        ConfirmedMeeting confirmedMeeting = new ConfirmedMeeting(meeting, startDateTime, endDateTime);
        confirmedMeetingRepository.save(confirmedMeeting);
        return MeetingConfirmResponse.from(confirmedMeeting);
    }

    private void validateHostPermission(Attendee attendee) {
        if (attendee.isNotHost()) {
            throw new MomoException(AttendeeErrorCode.ACCESS_DENIED);
        }
    }

    private void validateNotAlreadyConfirmed(Meeting meeting) {
        if (confirmedMeetingRepository.existsByMeeting(meeting)) {
            throw new MomoException(MeetingErrorCode.ALREADY_CONFIRMED);
        }
    }

    private void validateMeetingLocked(Meeting meeting) {
        if (!meeting.isLocked()) {
            throw new MomoException(MeetingErrorCode.MEETING_UNLOCKED);
        }
    }

    private void validateTimeRange(Meeting meeting, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        boolean isNotTimeInRange = !meeting.isTimeInRange(
                startDateTime.toLocalTime(), endDateTime.toLocalTime()
        );
        if (startDateTime.isAfter(endDateTime) || isNotTimeInRange) {
            throw new MomoException(MeetingErrorCode.INVALID_DATETIME_RANGE);
        }
    }

    private void validateDateRange(Meeting meeting, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        LocalDate startDate = startDateTime.toLocalDate();
        LocalDate endDate = endDateTime.toLocalDate();

        if (startDate.equals(endDate) && availableDates.notExistsByDate(startDate)) {
            throw new MomoException(MeetingErrorCode.INVALID_DATETIME_RANGE);
        }

        if (!startDate.equals(endDate) && meeting.isNotFullTime()) {
            throw new MomoException(MeetingErrorCode.INVALID_DATETIME_RANGE);
        }

        if (availableDates.isNotConsecutiveDay(startDate, endDate)) {
            throw new MomoException(MeetingErrorCode.INVALID_DATETIME_RANGE);
        }
    }

    @Transactional(readOnly = true)
    public ConfirmedMeetingResponse findByUuid(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        ConfirmedMeeting confirmedMeeting = confirmedMeetingRepository.findByMeeting(meeting)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_CONFIRMED));

        List<Attendee> attendees = attendeeRepository.findAllByMeeting(meeting);
        List<Schedule> schedules = scheduleRepository.findAllByAttendeeIn(attendees);

        attendees = confirmedMeeting.availableAttendeesOf(schedules);

        return ConfirmedMeetingResponse.from(meeting, attendees, confirmedMeeting);
    }

    @Transactional
    public void delete(String uuid, long attendeeId) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));
        validateHostPermission(attendee);

        confirmedMeetingRepository.deleteByMeeting(meeting);

        meeting.unlock();
    }
}
