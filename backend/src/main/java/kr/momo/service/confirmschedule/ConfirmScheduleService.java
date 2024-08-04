package kr.momo.service.confirmschedule;

import java.time.LocalDate;
import java.time.LocalDateTime;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.confirmedschedule.ConfirmedSchedule;
import kr.momo.domain.confirmedschedule.ConfirmedScheduleRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.ConfirmedScheduleErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.schedule.dto.ScheduleConfirmRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ConfirmScheduleService {

    private final MeetingRepository meetingRepository;
    private final AttendeeRepository attendeeRepository;
    private final AvailableDateRepository availableDateRepository;
    private final ConfirmedScheduleRepository confirmedScheduleRepository;

    @Transactional
    public void create(String uuid, long attendeeId, ScheduleConfirmRequest request) {
        LocalDateTime startDateTime = request.startDateTime();
        LocalDateTime endDateTime = request.endDateTime();

        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));
        validateHostPermission(attendee);

        if (confirmedScheduleRepository.existsByMeeting(meeting)) {
            throw new MomoException(ConfirmedScheduleErrorCode.ALREADY_EXIST_CONFIRMED_SCHEDULE);
        }

        validateMeetingLocked(meeting);
        validateTimeRange(meeting, startDateTime, endDateTime);
        validateDateRange(meeting, startDateTime, endDateTime);

        ConfirmedSchedule confirmedSchedule = new ConfirmedSchedule(meeting, startDateTime, endDateTime);
        confirmedScheduleRepository.save(confirmedSchedule);
    }

    private void validateHostPermission(Attendee attendee) {
        if (attendee.isNotHost()) {
            throw new MomoException(AttendeeErrorCode.ACCESS_DENIED);
        }
    }

    private void validateMeetingLocked(Meeting meeting) {
        if (!meeting.isLocked()) {
            throw new MomoException(MeetingErrorCode.MEETING_UNLOCKED);
        }
    }

    private void validateTimeRange(Meeting meeting, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        if (startDateTime.isAfter(endDateTime)
                || !meeting.isContainedWithinTimeRange(startDateTime.toLocalTime(), endDateTime.toLocalTime())) {
            throw new MomoException(ConfirmedScheduleErrorCode.INVALID_DATETIME_RANGE);
        }
    }

    private void validateDateRange(Meeting meeting, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        LocalDate startDate = startDateTime.toLocalDate();
        LocalDate endDate = endDateTime.toLocalDate();

        if (startDate.equals(endDate)) {
            if (availableDates.notExistsByDate(startDate)) {
                throw new MomoException(ConfirmedScheduleErrorCode.INVALID_DATETIME_RANGE);
            }
            return;
        }

        if (meeting.isNotFullTime()) {
            throw new MomoException(ConfirmedScheduleErrorCode.INVALID_DATETIME_RANGE);
        }

        if (availableDates.isContainedWithinDateRange(startDate, endDate)) {
            throw new MomoException(ConfirmedScheduleErrorCode.INVALID_DATETIME_RANGE);
        }
    }
}
