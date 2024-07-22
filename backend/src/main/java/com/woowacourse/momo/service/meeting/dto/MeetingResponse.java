package com.woowacourse.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.service.schedule.dto.ScheduleTimeResponse;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record MeetingResponse(
        String meetingName,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime startTime,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime endTime,
        List<LocalDate> availableDates,
        List<ScheduleTimeResponse> schedules
) {

    public static MeetingResponse from(
            Meeting meeting, List<LocalDate> availableDates, List<ScheduleTimeResponse> schedules
    ) {
        return new MeetingResponse(
                meeting.getName(),
                meeting.getTimeslotInterval().getFirstTimeslot().getTime(),
                meeting.getTimeslotInterval().getLastTimeslot().getTime(),
                availableDates,
                schedules
        );
    }
}
