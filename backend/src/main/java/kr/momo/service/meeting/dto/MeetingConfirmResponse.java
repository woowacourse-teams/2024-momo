package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import io.swagger.v3.oas.annotations.media.Schema;
import kr.momo.domain.meeting.ConfirmedMeeting;

// TODO 스키마 확인
@Schema(description = "약속 확정 응답", ref = "#/components/schemas/meetingConfirmLocalDateTime")
public record MeetingConfirmResponse(

        @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
        @Schema(description = "시작 날짜")
        LocalDate startDate,
        @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
        @Schema(description = "시작 시간")
        LocalTime startTime,
        @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
        @Schema(description = "종료 날짜")
        LocalDate endDate,
        @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
        @Schema(description = "종료 시간")
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
