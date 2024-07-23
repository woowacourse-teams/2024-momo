package com.woowacourse.momo.service.meeting.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record MeetingCreateRequest(
        @NotBlank String hostName,
        @NotBlank String hostPassword,
        @NotBlank String meetingName,
        int meetingAttendeeLimit,
        List<LocalDate> meetingAvailableDates,
        LocalTime meetingStartTime,
        LocalTime meetingEndTime
) {

}
