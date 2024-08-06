package kr.momo.service.schedule.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ScheduleCreateRequest(@NotNull List<DateTimesCreateRequest> dateTimes) {
}
