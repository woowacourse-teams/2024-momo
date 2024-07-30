package kr.momo.service.schedule.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record DateTimesCreateRequest(@NotNull LocalDate date, @NotNull List<LocalTime> times) {
}
