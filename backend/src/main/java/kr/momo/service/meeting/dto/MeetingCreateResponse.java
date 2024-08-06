package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.meeting.Meeting;

@Schema(description = "약속 생성 응답")
public record MeetingCreateResponse(

        @Schema(description = "약속 UUID")
        String uuid,

        @Schema(description = "호스트 이름")
        String hostName,

        @JsonIgnore
        String token) {

    public static MeetingCreateResponse from(Meeting meeting, Attendee attendee, String token) {
        return new MeetingCreateResponse(meeting.getUuid(), attendee.name(), token);
    }
}
