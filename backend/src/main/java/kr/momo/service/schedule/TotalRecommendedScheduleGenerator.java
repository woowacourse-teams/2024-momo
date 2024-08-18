package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateTimeInterval;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TotalRecommendedScheduleGenerator implements RecommendedScheduleGenerator {

    @Override
    public List<DateTimeInterval> recommend(String uuid, AttendeeGroup filteredGroup, String recommendType) {
        return List.of();
    }
}
