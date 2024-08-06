package kr.momo.service.meeting.dto;

import java.time.LocalDateTime;
import kr.momo.domain.meeting.ConfirmedMeeting;

public record MeetingConfirmResponse(LocalDateTime startDateTime, LocalDateTime endDateTime) {
    public static MeetingConfirmResponse from(ConfirmedMeeting confirmedMeeting) {
        return new MeetingConfirmResponse(confirmedMeeting.getStartDateTime(), confirmedMeeting.getEndDateTime());
    }
}
