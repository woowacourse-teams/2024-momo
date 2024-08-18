package kr.momo.service.schedule;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.stream.Stream;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.Meeting;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class RecommendedScheduleGeneratorFactoryTest {

    @Autowired
    private RecommendedScheduleGeneratorFactory recommendedScheduleGeneratorFactory;

    @DisplayName("미팅에 참여하는 전체 그룹과 필터링된 그룹에 따라 적절한 추천 스케줄 생성기를 반환한다.")
    @ParameterizedTest
    @MethodSource("foo")
    void findProperRecommenderBeanTest(List<String> attendeeNames, Class<?> expected) {
        // Given
        Meeting meeting = MeetingFixture.DRINK.create();
        List<Attendee> attendees = List.of(
                AttendeeFixture.HOST_JAZZ.create(meeting),
                AttendeeFixture.GUEST_DAON.create(meeting),
                AttendeeFixture.GUEST_PEDRO.create(meeting)
        );
        AttendeeGroup attendeeGroup = new AttendeeGroup(attendees);
        AttendeeGroup filteredGroup = attendeeGroup.filterAttendeesByName(attendeeNames);

        // When & Then
        assertThat(recommendedScheduleGeneratorFactory.getRecommenderOf(attendeeGroup, filteredGroup))
                .isInstanceOf(expected);
    }

    static Stream<Arguments> foo() {
        return Stream.of(
                Arguments.of(
                        List.of("jazz", "daon"),
                        FilteredRecommendedScheduleGenerator.class
                ),
                Arguments.of(
                        List.of("jazz", "daon", "pedro"),
                        TotalRecommendedScheduleGenerator.class
                )
        );
    }
}
