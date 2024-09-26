package kr.momo.service.schedule.dto;

import java.util.List;
import kr.momo.domain.meeting.MeetingType;

public record RecommendedSchedulesResponse(
        String type,
        List<RecommendedScheduleResponse> recommendedSchedules
) {

    public static RecommendedSchedulesResponse of(MeetingType type,
                                                  List<RecommendedScheduleResponse> recommendedSchedules) {
        return new RecommendedSchedulesResponse(type.name(), recommendedSchedules);
    }
}
