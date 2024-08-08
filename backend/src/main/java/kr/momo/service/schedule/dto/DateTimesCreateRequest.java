package kr.momo.service.schedule.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Schema(description = "일정 날짜 및 시간 생성 요청")
public record DateTimesCreateRequest(

        @NotNull
        @Schema(description = "일정 날짜")
        LocalDate date,

        @NotNull
        @Schema(description = "일정 시간 리스트", example = "[\"12:00\", \"12:30\", \"16:00\"]")
        List<LocalTime> times
) {
}
