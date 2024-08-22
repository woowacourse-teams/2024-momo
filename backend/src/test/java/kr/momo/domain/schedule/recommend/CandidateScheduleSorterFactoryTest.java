package kr.momo.domain.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.stream.Stream;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class CandidateScheduleSorterFactoryTest {

    @Autowired
    private CandidateScheduleSorterFactory candidateScheduleSorterFactory;

    @DisplayName("정렬 기준에 따라 적절한 스케줄 정렬기를 반환한다.")
    @ParameterizedTest
    @MethodSource("standardAndSorterPair")
    void extractProperSorterBeanTest(RecommendedScheduleSortStandard standard, Class<?> expected) {
        assertThat(candidateScheduleSorterFactory.getSorterOf(standard)).isInstanceOf(expected);
    }

    private static Stream<Arguments> standardAndSorterPair() {
        return Stream.of(
                Arguments.of(RecommendedScheduleSortStandard.EARLIEST_ORDER, EarliestFirstSorter.class),
                Arguments.of(RecommendedScheduleSortStandard.LONG_TERM_ORDER, LongTermFirstSorter.class)
        );
    }

    @DisplayName("추천 기준에 해당하는 정렬기가 없는 경우 예외가 발생한다.")
    @Test
    void throwsExceptionWhenInvalidStandard() {
        assertThatThrownBy(() -> candidateScheduleSorterFactory.getSorterOf(null))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
