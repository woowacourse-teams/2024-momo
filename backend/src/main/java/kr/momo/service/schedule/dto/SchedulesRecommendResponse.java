package kr.momo.service.schedule.dto;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;

public record SchedulesRecommendResponse(
        List<String> attendeeNames, List<ScheduleRecommendResponse> recommendSchedules
) {

    public static SchedulesRecommendResponse from(
            AttendeeGroup attendeeGroup, List<ScheduleRecommendResponse> recommendSchedules
    ) {
        List<String> attendeeNames = attendeeGroup.getAttendees().stream()
                .map(Attendee::name)
                .toList();

        return new SchedulesRecommendResponse(attendeeNames , recommendSchedules);
    }
}