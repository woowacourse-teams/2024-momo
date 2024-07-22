package com.woowacourse.momo.service.schedule.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record DateWithTimesRequest(@NotNull LocalDate date, @NotNull List<LocalTime> times) {
}
