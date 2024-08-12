package kr.momo.service.schedule.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.controller.validator.DateFormatConstraint;
import kr.momo.controller.validator.TimeFormatConstraint;

@Schema(description = "일정 날짜 및 시간 생성 요청")
public record DateTimesCreateRequest(

        @NotNull
        @DateFormatConstraint
        @Schema(description = "일정 날짜")
        String date,

        @NotNull
        @Schema(description = "일정 시간 리스트", example = "[\"12:00\", \"12:30\", \"16:00\"]")
        List<@TimeFormatConstraint String> times
) {

    public LocalDate toDate() {
        return LocalDate.parse(date);
    }

    public List<LocalTime> toTimes() {
            return times.stream()
                    .map(LocalTime::parse)
                    .toList();
    }
}
