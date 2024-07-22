package com.woowacourse.momo.service.meeting;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDates;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import com.woowacourse.momo.service.schedule.dto.ScheduleTimeResponse;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final AvailableDateRepository availableDateRepository;
    private final ScheduleRepository scheduleRepository;
    private final AttendeeRepository attendeeRepository;

    @Transactional(readOnly = true)
    public MeetingResponse findByUUID(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.NOT_FOUND_MEETING));
        AvailableDates availableDates = new AvailableDates(availableDateRepository.findAllByMeeting(meeting));

        return MeetingResponse.from(meeting, availableDates);
    }

    @Transactional
    public String create(MeetingCreateRequest request) {
        Meeting meeting = saveMeeting(request.meetingName(), request.meetingStartTime(), request.meetingEndTime());
        saveAvailableDates(request.meetingAvailableDates(), meeting);
        saveAttendee(meeting, request.hostName(), request.hostPassword(), Role.HOST);
        return meeting.getUuid();
    }

    private Meeting saveMeeting(String meetingName, LocalTime startTime, LocalTime endTime) {
        Meeting meeting = new Meeting(meetingName, UUID.randomUUID().toString(), startTime, endTime);
        return meetingRepository.save(meeting);
    }

    private void saveAvailableDates(List<LocalDate> dates, Meeting meeting) {
        AvailableDates availableDates = new AvailableDates(dates, meeting);
        availableDateRepository.saveAll(availableDates.getDates());
    }

    private void saveAttendee(Meeting meeting, String hostName, String hostPassword, Role role) {
        Attendee attendee = new Attendee(meeting, hostName, hostPassword, role);
        attendeeRepository.save(attendee);
    }

    public MeetingSharingResponse findMeetingSharing(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        return MeetingSharingResponse.from(meeting);
    }
}
