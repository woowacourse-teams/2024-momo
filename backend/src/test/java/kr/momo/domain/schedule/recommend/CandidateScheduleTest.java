package kr.momo.domain.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateAndTimeslot;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeGroupFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class CandidateScheduleTest {

    private static final int DEFAULT_MIN_SIZE = 0;

    @DisplayName("빈 리스트를 병합할 경우 빈 리스트를 반환한다.")
    @Test
    void mergeEmptyListTest() {
        // given
        List<CandidateSchedule> schedules = List.of();

        // when
        List<CandidateSchedule> mergedSchedules = CandidateSchedule.mergeContinuous(
                schedules, this::isContinuous, DEFAULT_MIN_SIZE
        );

        // then
        assertThat(mergedSchedules).isEmpty();
    }

    @DisplayName("연속된 시간을 병합한다.")
    @Test
    void mergeContinuousTest() {
        // given
        LocalDate today = LocalDate.now();
        AttendeeGroup group = AttendeeGroupFixture.JAZZ_DAON_BAKEY.create();
        List<CandidateSchedule> schedules = List.of(
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1000),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1030),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1100),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2200),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2230)
        );

        // when
        List<CandidateSchedule> mergedSchedules = CandidateSchedule.mergeContinuous(
                schedules, this::isContinuous, DEFAULT_MIN_SIZE
        );

        // then
        assertAll(
                () -> assertThat(mergedSchedules).hasSize(2),
                () -> assertThat(mergedSchedules.get(0).dateTimeInterval().startDateTime())
                        .isEqualTo(LocalDateTime.of(LocalDate.now(), Timeslot.TIME_1000.startTime())),
                () -> assertThat(mergedSchedules.get(0).dateTimeInterval().endDateTime())
                        .isEqualTo(LocalDateTime.of(LocalDate.now(), Timeslot.TIME_1100.endTime())),
                () -> assertThat(mergedSchedules.get(1).dateTimeInterval().startDateTime())
                        .isEqualTo(LocalDateTime.of(LocalDate.now(), Timeslot.TIME_2200.startTime())),
                () -> assertThat(mergedSchedules.get(1).dateTimeInterval().endDateTime())
                        .isEqualTo(LocalDateTime.of(LocalDate.now(), Timeslot.TIME_2230.endTime()))
        );
    }

    @DisplayName("연속된 시간 길이가 주어진 길이보다 같거나 큰 경우만 병합한다.")
    @ParameterizedTest
    @CsvSource(value = {"0,9", "1,9", "2,6", "3,4", "4,2", "5,1"})
    void mergeContinuousTestWhenHasMinSize(int minSize, int expected) {
        // given
        LocalDate today = LocalDate.now();
        AttendeeGroup group = AttendeeGroupFixture.JAZZ_DAON_BAKEY.create();
        List<CandidateSchedule> schedules = List.of(
                // 30분 간격 시간 후보 3개
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0000),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0100),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0200),
                // 60분 간격 시간 후보 2개
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0300),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0330),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0500),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_0530),
                // 90분 간격 시간 후보 2개
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1000),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1030),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1100),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1200),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1230),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1300),
                // 120분 간격 시간 후보 1개
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1700),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1730),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1800),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_1830),
                // 150분 간격 시간 후보 1개
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2030),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2100),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2130),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2200),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2230)
        );

        // when
        List<CandidateSchedule> mergedSchedules = CandidateSchedule.mergeContinuous(
                schedules, this::isContinuous, minSize
        );

        // then
        assertThat(mergedSchedules).hasSize(expected);
    }

    @DisplayName("자정을 포함하여 연속되는 시간의 경우 종료일자는 마지막 시간의 종료일자이다.")
    @Test
    void mergeContinuousIncludeMidnightTest() {
        // given
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        AttendeeGroup group = AttendeeGroupFixture.JAZZ_DAON_BAKEY.create();
        List<CandidateSchedule> schedules = List.of(
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2300),
                createDiscreteCandidateSchedule(group, today, Timeslot.TIME_2330),
                createDiscreteCandidateSchedule(group, tomorrow, Timeslot.TIME_0000),
                createDiscreteCandidateSchedule(group, tomorrow, Timeslot.TIME_0030),
                createDiscreteCandidateSchedule(group, tomorrow, Timeslot.TIME_1000)
        );

        // when
        List<CandidateSchedule> mergedSchedules = CandidateSchedule.mergeContinuous(
                schedules, this::isContinuous, DEFAULT_MIN_SIZE
        );

        // then
        assertAll(
                () -> assertThat(mergedSchedules).hasSize(2),
                () -> assertThat(mergedSchedules.get(0).dateTimeInterval().startDateTime())
                        .isEqualTo(LocalDateTime.of(today, Timeslot.TIME_2300.startTime())),
                () -> assertThat(mergedSchedules.get(0).dateTimeInterval().endDateTime())
                        .isEqualTo(LocalDateTime.of(tomorrow, Timeslot.TIME_0030.endTime())),
                () -> assertThat(mergedSchedules.get(1).dateTimeInterval().startDateTime())
                        .isEqualTo(LocalDateTime.of(tomorrow, Timeslot.TIME_1000.startTime())),
                () -> assertThat(mergedSchedules.get(1).dateTimeInterval().endDateTime())
                        .isEqualTo(LocalDateTime.of(tomorrow, Timeslot.TIME_1000.endTime()))
        );
    }

    private CandidateSchedule createDiscreteCandidateSchedule(
            AttendeeGroup attendeeGroup, LocalDate date, Timeslot timeslot
    ) {
        DateAndTimeslot dateAndTimeslot = new DateAndTimeslot(date, timeslot);
        return new CandidateSchedule(dateAndTimeslot.toDateTimeInterval(), attendeeGroup);
    }

    private boolean isContinuous(CandidateSchedule current, CandidateSchedule next) {
        return current.dateTimeInterval().isSequential(next.dateTimeInterval());
    }
}
