package kr.momo.domain.timeslot;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalTime;
import java.util.stream.Stream;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.ScheduleErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

class TimeslotIntervalTest {

    @DisplayName("주어진 시간이 시간슬롯 인터벌에 포함되어 있지 않으면 예외를 발생시킨다.")
    @Test
    public void throwsExceptionIfNotContainingInterval() {
        TimeslotInterval timeslotInterval = new TimeslotInterval(Timeslot.TIME_1000, Timeslot.TIME_1800);
        LocalTime other = Timeslot.TIME_0900.getLocalTime();

        assertThatThrownBy(() -> timeslotInterval.getValidatedTimeslot(other))
                .isInstanceOf(MomoException.class)
                .hasMessage(ScheduleErrorCode.INVALID_SCHEDULE_TIMESLOT.message());
    }

    @DisplayName("주어진 시간이 시간슬롯 인터벌에 포함되어 있으면 일치하는 타임슬롯을 반환한다.")
    @Test
    public void successfulWhenContainingIntervalFully() {
        TimeslotInterval timeslotInterval = new TimeslotInterval(Timeslot.TIME_1000, Timeslot.TIME_1800);
        LocalTime other = Timeslot.TIME_1200.getLocalTime();

        Timeslot timeslot = timeslotInterval.getValidatedTimeslot(other);

        assertThat(timeslot.getLocalTime()).isEqualTo(other);
    }

    @DisplayName("시작 끝이 같은 시간에 대한 시간슬롯 인터벌을 생성할 수 있다.")
    @Test
    public void successfulCreationForSameStartAndEndTime() {
        assertThatNoException()
                .isThrownBy(() -> new TimeslotInterval(LocalTime.of(23, 30), LocalTime.of(23, 30)));
    }

    @DisplayName("주어진 시작 시간, 끝 시간이 포함되어 있는지 확인한다.")
    @ParameterizedTest
    @MethodSource("isTimeInRangeProvider")
    void isTimeInRange(LocalTime startTime, LocalTime endTime, boolean expected) {
        TimeslotInterval timeslotInterval = new TimeslotInterval(Timeslot.TIME_0100, Timeslot.TIME_0200);

        boolean actual = timeslotInterval.isTimeInRange(startTime, endTime);

        assertThat(actual).isEqualTo(expected);
    }

    private static Stream<Arguments> isTimeInRangeProvider() {
        return Stream.of(
                Arguments.of(
                        LocalTime.of(1, 0),
                        LocalTime.of(2, 30), true),
                Arguments.of(
                        LocalTime.of(2, 0),
                        LocalTime.of(3, 0), false));
    }
}
