package kr.momo.service.schedule.recommend;

import java.util.Map;
import kr.momo.domain.attendee.AttendeeGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduleRecommenderFactory {

    private final Map<String, ScheduleRecommender> candidates;

    public ScheduleRecommender getRecommenderOf(AttendeeGroup attendeeGroup, AttendeeGroup filteredGroup) {
        if (filteredGroup.containsAll(attendeeGroup)) {
            return candidates.get(fetchBeanName(TotalScheduleRecommender.class));
        }
        return candidates.get(fetchBeanName(FilteredScheduleRecommender.class));
    }

    private String fetchBeanName(Class<?> clazz) {
        char[] className = clazz.getSimpleName().toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return new String(className);
    }
}
