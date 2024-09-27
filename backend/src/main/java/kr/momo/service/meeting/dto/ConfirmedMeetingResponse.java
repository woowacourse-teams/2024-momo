package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.Meeting;

public record ConfirmedMeetingResponse(
        String meetingName,
        String hostName,
        List<String> availableAttendeeNames,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate startDate,
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime startTime,
        String startDayOfWeek,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate endDate,
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime endTime,
        String endDayOfWeek,
        String type
) {

    public static ConfirmedMeetingResponse from(
            Meeting meeting, Attendee host, AttendeeGroup attendees, ConfirmedMeeting confirmedMeeting
    ) {
        return new ConfirmedMeetingResponse(
                meeting.getName(),
                host.name(),
                attendees.names(),
                confirmedMeeting.getStartDateTime().toLocalDate(),
                confirmedMeeting.getStartDateTime().toLocalTime(),
                confirmedMeeting.getStartDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN),
                confirmedMeeting.getEndDateTime().toLocalDate(),
                confirmedMeeting.getEndDateTime().toLocalTime(),
                confirmedMeeting.getEndDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN),
                meeting.getType().name()
        );
    }
}
