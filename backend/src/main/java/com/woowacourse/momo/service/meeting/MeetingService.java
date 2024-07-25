package com.woowacourse.momo.service.meeting;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDates;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final AvailableDateRepository availableDateRepository;
    private final AttendeeRepository attendeeRepository;

    @Transactional
    public String create(MeetingCreateRequest request) {
        Meeting meeting = saveMeeting(request.meetingName(), request.meetingStartTime(), request.meetingEndTime());
        saveAvailableDates(request.meetingAvailableDates(), meeting);
        saveHostAttendee(meeting, request.hostName(), request.hostPassword());
        return meeting.getUuid();
    }

    private Meeting saveMeeting(String meetingName, LocalTime startTime, LocalTime endTime) {
        Meeting meeting = new Meeting(meetingName, UUID.randomUUID().toString(), startTime, endTime);
        return meetingRepository.save(meeting);
    }

    private void saveAvailableDates(List<LocalDate> dates, Meeting meeting) {
        AvailableDates availableDates = new AvailableDates(dates, meeting);
        availableDateRepository.saveAll(availableDates.getAvailableDates());
    }

    private void saveHostAttendee(Meeting meeting, String hostName, String hostPassword) {
        Attendee attendee = new Attendee(meeting, hostName, hostPassword, Role.HOST);
        attendeeRepository.save(attendee);
    }

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));

        return MeetingResponse.from(meeting, availableDates);
    }

    @Transactional(readOnly = true)
    public MeetingSharingResponse findMeetingSharing(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        return MeetingSharingResponse.from(meeting);
    }
}
