package com.woowacourse.momo.domain.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import java.time.LocalTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MeetingTest {

    @DisplayName("약속 시작 시간이 끝 시간과 같으면 예외가 발생한다.")
    @Test
    void throwExceptionWhenEqualStartTimeIsEqualEndTime() {
        // given
        LocalTime startTime = LocalTime.of(15, 0);
        LocalTime endTime = LocalTime.of(15, 0);

        // when then
        assertThatThrownBy(() -> new Meeting("momo", "momo", startTime, endTime))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_TIME_RANGE.message());
    }

    @DisplayName("약속 시작 시간이 끝 시간보다 늦으면 예외가 발생한다.")
    @Test
    void throwExceptionWhenStartTimeIsAfterEndTime() {
        // given
        LocalTime startTime = LocalTime.of(15, 0);
        LocalTime endTime = LocalTime.of(10, 0);

        // when then
        assertThatThrownBy(() -> new Meeting("momo", "momo", startTime, endTime))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_TIME_RANGE.message());
    }

    @DisplayName("약속 시작 시간이 끝 시간보다 빠르면 예외가 발생하지 않는다.")
    @Test
    void doesNotThrowExceptionStartAndEndTimeSame() {
        // given
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(15, 0);

        // when then
        assertThatCode(() -> new Meeting("momo", "momo", startTime, endTime))
                .doesNotThrowAnyException();
    }

    @DisplayName("자정 시간을 23시 30분 타임슬롯으로 변경한다")
    @Test
    void canConvertMidnight() {
        // given
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(0, 0);

        // when
        Meeting meeting = new Meeting("momo", "momo", startTime, endTime);

        // when then
        assertThat(meeting.getLastTimeslot()).isEqualTo(Timeslot.TIME_2330);
    }
}
