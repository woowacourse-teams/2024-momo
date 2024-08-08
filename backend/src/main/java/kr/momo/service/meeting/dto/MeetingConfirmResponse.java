package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDate;
import java.time.LocalTime;
import kr.momo.domain.meeting.ConfirmedMeeting;

public record MeetingConfirmResponse(

        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate startDate,
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime startTime,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = Shape.STRING)
        LocalDate endDate,
        @JsonFormat(pattern = "HH:mm", shape = Shape.STRING)
        LocalTime endTime
) {

    public static MeetingConfirmResponse from(ConfirmedMeeting confirmedMeeting) {
        return new MeetingConfirmResponse(
                confirmedMeeting.getStartDateTime().toLocalDate(),
                confirmedMeeting.getStartDateTime().toLocalTime(),
                confirmedMeeting.getEndDateTime().toLocalDate(),
                confirmedMeeting.getEndDateTime().toLocalTime()
        );
    }
}
