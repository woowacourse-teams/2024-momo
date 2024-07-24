package com.woowacourse.momo.domain.meeting;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MeetingTest {

    @DisplayName("약속 시작 시간이 약속 마지막 시간보다 늦은 시간이면 예외가 발생한다.")
    @Test
    void throwExceptionWhenInvalidTimeRange() {
        assertThatThrownBy(() -> new Meeting("momo", "momo", Timeslot.TIME_1500, Timeslot.TIME_0600))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_TIME_RANGE.message());
    }

    @DisplayName("약속 시작 시간이 마지막 시간과 같으면 예외가 발생하지 않는다.")
    @Test
    void doesNotThrowExceptionStartAndEndTimeSame() {
        assertThatCode(() -> new Meeting("momo", "momo", Timeslot.TIME_1500, Timeslot.TIME_1500))
                .doesNotThrowAnyException();
    }
}
