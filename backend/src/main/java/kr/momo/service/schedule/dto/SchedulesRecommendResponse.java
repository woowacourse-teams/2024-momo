package kr.momo.service.schedule.dto;

import java.util.List;
import kr.momo.domain.attendee.Attendee;

public record SchedulesRecommendResponse(
        List<String> attendeeNames, List<ScheduleRecommendResponse> recommendSchedules
) {

    public static SchedulesRecommendResponse from(
            List<Attendee> attendees, List<ScheduleRecommendResponse> recommendSchedules) {
        return new SchedulesRecommendResponse(attendees.stream().map(Attendee::name).toList(), recommendSchedules);
    }
}
