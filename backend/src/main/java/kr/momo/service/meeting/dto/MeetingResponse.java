package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;

@Schema(description = "약속 정보 응답")
public record MeetingResponse(

        @Schema(description = "약속 이름")
        String meetingName,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(type = "string", pattern = "HH:mm", description = "약속 시작 시각")
        LocalTime firstTime,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(type = "string", pattern = "HH:mm", description = "약속 종료 시각")
        LocalTime lastTime,

        @Schema(description = "약속 잠금 여부")
        boolean isLocked,

        @Schema(description = "약속 가능한 날짜들")
        List<LocalDate> availableDates,

        @Schema(description = "참가자 이름 목록")
        List<String> attendeeNames,

        @Schema(description = "약속 주최자 이름")
        String hostName
) {

    public static MeetingResponse of(Meeting meeting, AvailableDates availableDates, List<Attendee> attendees) {
        List<LocalDate> dates = availableDates.asList();

        List<String> attendeeNames = attendees.stream()
                .map(Attendee::name)
                .toList();

        String hostName = attendees.stream()
                .filter(Attendee::isHost)
                .map(Attendee::name)
                .findFirst()
                .orElseThrow(() -> new MomoException(MeetingErrorCode.MEETING_LOAD_FAILURE));

        return new MeetingResponse(
                meeting.getName(),
                meeting.earliestTime(),
                meeting.lastTime(),
                meeting.isLocked(),
                dates,
                attendeeNames,
                hostName
        );
    }
}
