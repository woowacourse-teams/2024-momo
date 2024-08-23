package kr.momo.service.schedule.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Schema(description = "일정 생성 요청")
public record ScheduleCreateRequest(

        @NotNull
        @Schema(description = "날짜 및 시간 리스트")
        List<DateTimesCreateRequest> dateTimes) {
}
