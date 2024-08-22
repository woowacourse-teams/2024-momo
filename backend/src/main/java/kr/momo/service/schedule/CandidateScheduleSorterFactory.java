package kr.momo.service.schedule;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CandidateScheduleSorterFactory {

    private final Map<String, CandidateScheduleSorter> candidates;

    public CandidateScheduleSorter getSorterOf(RecommendedScheduleSortStandard standard) {
        if (standard == RecommendedScheduleSortStandard.EARLIEST_ORDER) {
            return candidates.get(fetchBeanName(EarliestFirstSorter.class));
        }
        if (standard == RecommendedScheduleSortStandard.LONG_TERM_ORDER) {
            return candidates.get(fetchBeanName(LongTermFirstSorter.class));
        }
        throw new IllegalArgumentException("잘못된 정렬 기준입니다.");
    }

    private String fetchBeanName(Class<?> clazz) {
        char[] className = clazz.getSimpleName().toCharArray();
        className[0] = Character.toLowerCase(className[0]);
        return new String(className);
    }
}
