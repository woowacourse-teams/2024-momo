package com.woowacourse.momo.service.schedule.dto;

import com.woowacourse.momo.domain.attendee.Attendee;
import java.util.List;

public record ScheduleOneAttendeeResponse(String attendeeName, List<ScheduleDateTimesResponse> schedules) {

    public static ScheduleOneAttendeeResponse of(Attendee attendee, List<ScheduleDateTimesResponse> dateTimes) {
        return new ScheduleOneAttendeeResponse(attendee.name(), dateTimes);
    }
}
