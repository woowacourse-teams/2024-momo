package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import kr.momo.domain.meeting.ConfirmedMeeting;

@Schema(description = "약속 확정 응답", ref = "#/components/schemas/meetingConfirmLocalDateTime")
public record MeetingConfirmResponse(

        @Schema(description = "시작 날짜 시간")
        LocalDateTime startDateTime,

        @Schema(description = "종료 날짜 시간")
        LocalDateTime endDateTime
) {
    public static MeetingConfirmResponse from(ConfirmedMeeting confirmedMeeting) {
        return new MeetingConfirmResponse(confirmedMeeting.getStartDateTime(), confirmedMeeting.getEndDateTime());
    }
}
