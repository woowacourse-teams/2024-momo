package kr.momo.domain.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.fixture.AttendeeGroupFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class LongTermFirstSorterTest {

    @DisplayName("참여자 수 내림차순으로 정렬 후 일정 길이 내림차순으로 정렬한다.")
    @Test
    void sort() {
        // given
        LocalDateTime now = LocalDateTime.now();
        AttendeeGroup twoAttendees = AttendeeGroupFixture.JAZZ_DAON.create();
        AttendeeGroup threeAttendees = AttendeeGroupFixture.JAZZ_DAON_BAKEY.create();

        // (2명, 20분), (3명, 15분), (2명, 10분), (3명, 5분), (2명, 30분)
        List<CandidateSchedule> unorderedSchedules = createCandidateSchedules(
                now,
                List.of(20, 15, 10, 5, 30),
                List.of(twoAttendees, threeAttendees, twoAttendees, threeAttendees, twoAttendees)
        );
        List<CandidateSchedule> sortableSchedules = new ArrayList<>(unorderedSchedules);
        LongTermFirstSorter sorter = new LongTermFirstSorter();

        // when
        sorter.sort(sortableSchedules);

        // then
        // (3명, 15분), (3명, 5분), (2명, 30분), (2명, 20분), (2명, 10분)
        List<CandidateSchedule> expected = createCandidateSchedules(
                now,
                List.of(15, 5, 30, 20, 10),
                List.of(threeAttendees, threeAttendees, twoAttendees, twoAttendees, twoAttendees)
        );
        assertThat(sortableSchedules).isEqualTo(expected);
    }

    private List<CandidateSchedule> createCandidateSchedules(
            LocalDateTime base, List<Integer> durations, List<AttendeeGroup> attendeeGroups
    ) {
        return IntStream.range(0, durations.size())
                .mapToObj(i -> CandidateSchedule.of(
                        base.plusMinutes(durations.get(i)),
                        base.plusMinutes(durations.get(i) * 2),
                        attendeeGroups.get(i)
                ))
                .toList();
    }
}
