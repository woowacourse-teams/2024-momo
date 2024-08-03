package kr.momo.service.schedule.dto;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.Attendees;

public record SchedulesRecommendResponse(
        List<String> attendeeNames, List<ScheduleRecommendResponse> recommendSchedules
) {

    public static SchedulesRecommendResponse from(
            Attendees attendees, List<ScheduleRecommendResponse> recommendSchedules
    ) {
        List<String> attendeeNames = attendees.getAttendees().stream()
                .map(Attendee::name)
                .toList();

        return new SchedulesRecommendResponse(attendeeNames , recommendSchedules);
    }
}
