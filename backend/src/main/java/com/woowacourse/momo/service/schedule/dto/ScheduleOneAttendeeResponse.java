package com.woowacourse.momo.service.schedule.dto;

import com.woowacourse.momo.domain.attendee.Attendee;
import java.util.List;

public record ScheduleOneAttendeeResponse(String attendeeName, List<ScheduleOneAttendeeDateTimesResponse> dateTimes) {

    public static ScheduleOneAttendeeResponse of(
            Attendee attendee, List<ScheduleOneAttendeeDateTimesResponse> dateTimes
    ) {
        return new ScheduleOneAttendeeResponse(attendee.name(), dateTimes);
    }
}
