package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertTimeoutPreemptively;

import java.time.Duration;
import java.util.List;
import java.util.stream.IntStream;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class AttendeeGroupTest {

    @DisplayName("참가자의 이름이 중복이면 예외를 발생시킨다.")
    @Test
    void validateUniqueAttendeeNames() {
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee jazz = AttendeeFixture.HOST_JAZZ.create(meeting);
        Attendee pedro1 = AttendeeFixture.GUEST_PEDRO.create(meeting);
        Attendee pedro2 = AttendeeFixture.GUEST_PEDRO.create(meeting);
        List<Attendee> attendees = List.of(jazz, pedro1, pedro2);

        assertThatThrownBy(() -> new AttendeeGroup(attendees))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.DUPLICATED_ATTENDEE_NAME.message());
    }

    @DisplayName("참석자 그룹의 모든 조합을 구한다.")
    @Test
    void findCombinationAttendeeGroups() {
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee jazz = AttendeeFixture.HOST_JAZZ.create(meeting);
        Attendee pedro = AttendeeFixture.GUEST_PEDRO.create(meeting);
        Attendee baeky = AttendeeFixture.GUEST_BAKEY.create(meeting);
        AttendeeGroup attendeeGroup = new AttendeeGroup(List.of(jazz, pedro, baeky));

        List<AttendeeGroup> attendeeGroups = attendeeGroup.findAttendeeGroupCombinationsOverSize(1);

        assertThat(attendeeGroups)
                .containsExactlyInAnyOrder(
                        new AttendeeGroup(List.of(jazz, pedro, baeky)),
                        new AttendeeGroup(List.of(jazz, pedro)),
                        new AttendeeGroup(List.of(jazz, baeky)),
                        new AttendeeGroup(List.of(pedro, baeky)),
                        new AttendeeGroup(List.of(jazz)),
                        new AttendeeGroup(List.of(pedro)),
                        new AttendeeGroup(List.of(baeky))
                );
    }

    @Disabled("조합 로직을 개선해야 본 테스트가 통과합니다.")
    @DisplayName("참석자 그룹 조합 도출 로직의 성능을 평가한다.")
    @ValueSource(ints = {10, 20, 30})
    @ParameterizedTest
    void findCombinationAttendeeGroupsPerformanceTest(int n) {
        // given
        int limit = 3;
        List<Attendee> attendees = IntStream.range(0, n)
                .mapToObj(i -> new Attendee(null, String.valueOf(i), "", null))
                .toList();
        AttendeeGroup attendeeGroup = new AttendeeGroup(attendees);

        // when & then
        assertTimeoutPreemptively(Duration.ofSeconds(3), () -> {
            List<AttendeeGroup> combinations = attendeeGroup.findAttendeeGroupCombinationsOverSize(n-limit+1);

            int expected = IntStream.range(0, limit).map(i -> nCr(n, n-i)).sum();
            assertThat(combinations).hasSize(expected);
        });
    }

    private int nCr(int n, int r) {
        if (r > n) return 0;
        if (r == 0 || r == n) return 1;
        r = Math.min(r, n - r);
        int result = 1;
        for (int i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        return result;
    }
}
