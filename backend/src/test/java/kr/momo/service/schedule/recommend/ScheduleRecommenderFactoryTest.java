package kr.momo.service.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.stream.Stream;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.Meeting;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class ScheduleRecommenderFactoryTest {

    @Autowired
    private ScheduleRecommenderFactory scheduleRecommenderFactory;

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @DisplayName("미팅에 참여하는 전체 그룹과 필터링된 그룹에 따라 적절한 추천 스케줄 생성기를 반환한다.")
    @ParameterizedTest
    @MethodSource("attendeeNamesAndRecommenderPair")
    void extractProperRecommenderBeanTest(List<String> attendeeNames, Class<?> expected) {
        // given
        Meeting meeting = MeetingFixture.DRINK.create();
        List<Attendee> attendees = List.of(
                AttendeeFixture.HOST_JAZZ.create(meeting, passwordEncoder),
                AttendeeFixture.GUEST_DAON.create(meeting, passwordEncoder),
                AttendeeFixture.GUEST_PEDRO.create(meeting, passwordEncoder)
        );
        AttendeeGroup attendeeGroup = new AttendeeGroup(attendees);
        AttendeeGroup filteredGroup = attendeeGroup.filterAttendeesByName(attendeeNames);

        // when & then
        assertThat(scheduleRecommenderFactory.getRecommenderOf(attendeeGroup, filteredGroup))
                .isInstanceOf(expected);
    }

    static Stream<Arguments> attendeeNamesAndRecommenderPair() {
        return Stream.of(
                Arguments.of(
                        List.of("jazz", "daon"),
                        FilteredScheduleRecommender.class
                ),
                Arguments.of(
                        List.of("jazz", "daon", "pedro"),
                        TotalScheduleRecommender.class
                )
        );
    }
}
