package com.woowacourse.momo.service.meeting.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record MeetingCreateRequest(
        @NotBlank String hostName,
        @NotBlank String hostPassword,
        @NotBlank String meetingName,
        @NotBlank List<LocalDate> meetingAvailableDates,
        @NotNull LocalTime meetingStartTime,
        @NotNull LocalTime meetingEndTime
) {

}
