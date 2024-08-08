package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.Meeting;

public record MeetingConfirmedResponse(
        String meetingName,
        List<String> availableAttendeeNames,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
        LocalDate startDate,
        @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
        LocalTime startTime,
        String startDayOfWeek,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
        LocalDate endDate,
        @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
        LocalTime endTime,
        String endDayOfWeek
) {

    public static MeetingConfirmedResponse from(Meeting meeting, List<Attendee> attendees,
                                                ConfirmedMeeting confirmedMeeting) {
        return new MeetingConfirmedResponse(
                meeting.getName(),
                attendees.stream().map(Attendee::name).toList(),
                confirmedMeeting.getStartDateTime().toLocalDate(),
                confirmedMeeting.getStartDateTime().toLocalTime(),
                confirmedMeeting.getStartDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN),
                confirmedMeeting.getEndDateTime().toLocalDate(),
                confirmedMeeting.getEndDateTime().toLocalTime(),
                confirmedMeeting.getEndDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN)
        );
    }
}
