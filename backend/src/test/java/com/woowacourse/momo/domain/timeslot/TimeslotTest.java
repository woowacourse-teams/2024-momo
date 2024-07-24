package com.woowacourse.momo.domain.timeslot;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.TimeslotErrorCode;
import java.time.LocalTime;
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
        LocalTime localTime = Timeslot.TIME_1200.getLocalTime();

        Timeslot timeslot = Timeslot.from(localTime);

        assertThat(timeslot.getLocalTime()).isEqualTo(localTime);
    }
}
