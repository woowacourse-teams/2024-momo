package kr.momo.service.schedule.dto;

import java.util.List;
import kr.momo.domain.attendee.Attendee;

public record ScheduleOneAttendeeResponse(String attendeeName, List<ScheduleDateTimesResponse> schedules) {

    public static ScheduleOneAttendeeResponse of(Attendee attendee, List<ScheduleDateTimesResponse> dateTimes) {
        return new ScheduleOneAttendeeResponse(attendee.name(), dateTimes);
    }
}
