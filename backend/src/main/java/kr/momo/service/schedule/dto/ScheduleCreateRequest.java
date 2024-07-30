package kr.momo.service.schedule.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ScheduleCreateRequest(@NotBlank String attendeeName, @NotNull List<DateTimesCreateRequest> dateTimes) {
}
