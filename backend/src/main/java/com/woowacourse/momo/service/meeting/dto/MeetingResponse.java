package com.woowacourse.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDates;
import com.woowacourse.momo.domain.meeting.Meeting;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

public record MeetingResponse(
        String meetingName,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime firstTime,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime lastTime,
        List<LocalDate> availableDates
) {

    public static MeetingResponse from(Meeting meeting, AvailableDates availableDates) {
        List<LocalDate> dates = availableDates.getAvailableDates().stream()
                .map(AvailableDate::getDate)
                .collect(Collectors.toList());

        return new MeetingResponse(
                meeting.getName(),
                meeting.startTimeslotTime(),
                meeting.endTimeslotTime(),
                dates
        );
    }
}
