package com.woowacourse.momo.service.schedule.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ScheduleCreateRequest(
        @NotNull Long meetingId,
        @NotBlank String attendeeName,
        @NotNull List<DateWithTimesRequest> dateTimes
) {
}
