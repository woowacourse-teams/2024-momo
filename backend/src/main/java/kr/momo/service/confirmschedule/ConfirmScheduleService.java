package kr.momo.service.confirmschedule;

import java.time.LocalDate;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
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
    public void confirmSchedule(String uuid, long attendeeId, ScheduleConfirmRequest request) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        Attendee attendee = attendeeRepository.findByIdAndMeeting(attendeeId, meeting)
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_ATTENDEE));

        validateHostPermission(attendee);

        if (confirmedScheduleRepository.existsByMeeting(meeting)) {
            throw new MomoException(ConfirmedScheduleErrorCode.CONFIRMED_SCHEDULE_EXISTS);
        }

        validateMeetingLocked(meeting);

        AvailableDate date = getValidateAvailableDate(meeting, request.date());
        meeting.validateContainedTimes(request.startTime(), request.endTime());

        ConfirmedSchedule confirmedSchedule = new ConfirmedSchedule(meeting, date, request.startTime(), request.endTime());
        confirmedScheduleRepository.save(confirmedSchedule);
    }

    private void validateHostPermission(Attendee attendee) {
        if (!attendee.isHost()) {
            throw new MomoException(AttendeeErrorCode.ACCESS_DENIED);
        }
    }

    private void validateMeetingLocked(Meeting meeting) {
        if (!meeting.isLocked()) {
            throw new MomoException(MeetingErrorCode.MEETING_UNLOCKED);
        }
    }

    private AvailableDate getValidateAvailableDate(Meeting meeting, LocalDate date) {
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));
        return availableDates.findByDate(date);
    }
}
