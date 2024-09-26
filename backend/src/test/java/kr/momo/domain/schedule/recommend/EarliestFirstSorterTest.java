package kr.momo.domain.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.fixture.AttendeeGroupFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class EarliestFirstSorterTest {

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @DisplayName("참여자 수 내림차순으로 정렬 후 시작 시간 오름차순으로 정렬한다.")
    @Test
    void sort() {
        // given
        LocalDateTime now = LocalDateTime.now();
        AttendeeGroup twoAttendees = AttendeeGroupFixture.JAZZ_DAON.create(passwordEncoder);
        AttendeeGroup threeAttendees = AttendeeGroupFixture.JAZZ_DAON_BAKEY.create(passwordEncoder);

        // (2명, 20분), (3명, 15분), (2명, 10분), (3명, 5분), (2명, 30분)
        List<CandidateSchedule> unorderedSchedules = createCandidateSchedules(
                now,
                List.of(20, 15, 10, 5, 30),
                List.of(twoAttendees, threeAttendees, twoAttendees, threeAttendees, twoAttendees)
        );
        List<CandidateSchedule> sortableSchedules = new ArrayList<>(unorderedSchedules);
        EarliestFirstSorter sorter = new EarliestFirstSorter();

        // when
        sorter.sort(sortableSchedules);

        // then
        // (3명, 5분), (3명, 15분), (2명, 10분), (2명, 20분), (2명, 30분)
        List<CandidateSchedule> expected = createCandidateSchedules(
                now,
                List.of(5, 15, 10, 20, 30),
                List.of(threeAttendees, threeAttendees, twoAttendees, twoAttendees, twoAttendees)
        );
        assertThat(sortableSchedules).isEqualTo(expected);
    }

    private List<CandidateSchedule> createCandidateSchedules(
            LocalDateTime base, List<Integer> minutesToAdd, List<AttendeeGroup> attendeeGroups
    ) {
        return IntStream.range(0, minutesToAdd.size())
                .mapToObj(i -> CandidateSchedule.of(
                        base.plusMinutes(minutesToAdd.get(i)),
                        base.plusMinutes(minutesToAdd.get(i) + 30),
                        attendeeGroups.get(i)
                ))
                .toList();
    }
}
