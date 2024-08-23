package kr.momo.domain.timeslot;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalTime;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.TimeslotErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TimeslotTest {

    @DisplayName("주어진 시간에 해당하는 시간슬롯이 없으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionWhenTimeslotNotFound() {
        LocalTime localTime = LocalTime.of(11, 43);

        assertThatThrownBy(() -> Timeslot.from(localTime))
                .isInstanceOf(MomoException.class)
                .hasMessage(TimeslotErrorCode.INVALID_TIMESLOT.message());
    }

    @DisplayName("주어진 시간에 해당하는 시간슬롯이 존재하면 해당 시간슬롯을 반환한다.")
    @Test
    void successfulWhenTimeslotExists() {
        LocalTime localTime = Timeslot.TIME_1200.startTime();

        Timeslot timeslot = Timeslot.from(localTime);

        assertThat(timeslot.startTime()).isEqualTo(localTime);
    }


    @DisplayName("시간슬롯의 시작 시각은 해당 슬롯의 대표값과 같다.")
    @Test
    void timeSlotStartTime() {
        // given
        Timeslot timeslot = Timeslot.TIME_0130;

        // when
        LocalTime startTime = timeslot.startTime();

        // then
        assertThat(startTime).isEqualTo(LocalTime.of(1, 30));
    }

    @DisplayName("시간슬롯의 끝 시각은 해당 슬롯의 대표값에 슬롯 길이를 더한 시각과 같다.")
    @Test
    void timeSlotEndTime() {
        // given
        Timeslot timeslot = Timeslot.TIME_2330;

        // when
        LocalTime endTime = timeslot.endTime();

        // then
        assertThat(endTime).isEqualTo(LocalTime.of(0, 0));
    }
}
