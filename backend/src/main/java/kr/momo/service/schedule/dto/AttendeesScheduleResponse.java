package kr.momo.service.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Schema(description = "일정 정보 응답")
public record AttendeesScheduleResponse(

        @Schema(description = "일정 날짜")
        LocalDate date,

        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        @Schema(type = "string", pattern = "HH:mm", description = "일정 시간", example = "14:00")
        LocalTime time,

        @Schema(description = "참가자 이름 목록", example = "[\"모모\", \"행성이\", \"뚜리\"]")
        List<String> attendeeNames
) {
}
