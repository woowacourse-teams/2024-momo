package com.woowacourse.momo.domain.meeting.dto;

import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.schedule.dto.ScheduleTimeResponse;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record MeetingResponse(
        String meetingName,
        LocalTime startTime,
        LocalTime endTime,
        List<LocalDate> availableDates,
        List<ScheduleTimeResponse> schedules
) {

    public static MeetingResponse from(
            Meeting meeting, List<LocalDate> availableDates, List<ScheduleTimeResponse> schedules
    ) {
        return new MeetingResponse(
                meeting.getName(),
                meeting.getStartTime().getTime(),
                meeting.getEndTime().getTime(),
                availableDates,
                schedules
        );
    }
}
