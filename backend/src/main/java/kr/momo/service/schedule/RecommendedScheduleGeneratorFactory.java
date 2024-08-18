package kr.momo.service.schedule;

import java.util.Map;
import kr.momo.domain.attendee.AttendeeGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RecommendedScheduleGeneratorFactory {

    private final Map<String, RecommendedScheduleGenerator> candidates;

    public RecommendedScheduleGenerator getRecommenderOf(AttendeeGroup attendeeGroup, AttendeeGroup filteredGroup) {
        // TODO: containsAll 로 체크해야 함
        if (attendeeGroup.size() == filteredGroup.size()) {
            return candidates.get(fetchBeanName(TotalRecommendedScheduleGenerator.class));
        }
        return candidates.get(fetchBeanName(FilteredRecommendedScheduleGenerator.class));
    }

    private String fetchBeanName(Class<?> clazz) {
        char[] className = clazz.getSimpleName().toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return new String(className);
    }
}
