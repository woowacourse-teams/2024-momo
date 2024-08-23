package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;

@Schema(description = "약속 생성 응답")
public record MeetingCreateResponse(

        @Schema(description = "약속 UUID")
        String uuid,

        @Schema(description = "약속 이름")
        String meetingName,

        @Schema(description = "호스트 이름")
        String hostName,

        @Schema(description = "선택 가능 날짜")
        List<LocalDate> availableDates,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(type = "String", pattern = "HH:mm", description = "선택 가능한 가장 이른 시각")
        LocalTime earliestTime,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(type = "String", pattern = "HH:mm", description = "선택 가능한 가장 늦은 시각")
        LocalTime lastTime,

        @JsonIgnore
        String token
) {

    public static MeetingCreateResponse from(Meeting meeting, Attendee host, AvailableDates dates, String token) {
        return new MeetingCreateResponse(
                meeting.getUuid(),
                meeting.getName(),
                host.name(),
                dates.asList(),
                meeting.earliestTime(),
                meeting.lastTime(),
                token
        );
    }
}
