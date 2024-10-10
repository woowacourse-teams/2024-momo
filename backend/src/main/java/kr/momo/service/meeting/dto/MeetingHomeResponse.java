package kr.momo.service.meeting.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.momo.domain.meeting.Meeting;

@Schema(description = "약속 입장 응답")
public record MeetingHomeResponse(

        @Schema(description = "약속 이름")
        String meetingName,

        @Schema(description = "약속 유형")
        String type
) {
    public static MeetingHomeResponse from(Meeting meeting) {
        return new MeetingHomeResponse(meeting.getName(), meeting.getType().name());
    }
}
