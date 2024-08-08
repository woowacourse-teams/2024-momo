package kr.momo.service.meeting.dto;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.meeting.ConfirmedMeeting;
import kr.momo.domain.meeting.Meeting;

public record MeetingConfirmedResponse(
        String meetingName,
        List<String> availableAttendeeNames,
        LocalDateTime startDateTime,
        String startDayOfWeek,
        LocalDateTime endDateTime,
        String endDayOfWeek
) {
    public static MeetingConfirmedResponse from(Meeting meeting, List<Attendee> attendees,
                                                ConfirmedMeeting confirmedMeeting) {
        return new MeetingConfirmedResponse(
                meeting.getName(),
                attendees.stream().map(Attendee::name).toList(),
                confirmedMeeting.getStartDateTime(),
                confirmedMeeting.getStartDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN),
                confirmedMeeting.getEndDateTime(),
                confirmedMeeting.getEndDateTime().getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREAN)
        );
    }
}
