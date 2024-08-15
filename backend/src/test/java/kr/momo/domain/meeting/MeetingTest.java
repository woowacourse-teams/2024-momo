package kr.momo.domain.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalTime;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.fixture.MeetingFixture;
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

    @DisplayName("약속 생성 시 끝 시간을 사용자 입력 끝 시간에서 30분 감소시켜 저장한다.")
    @Test
    void endTimeIsReducedBy30Minutes() {
        // given
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(0, 0);

        // when
        Meeting meeting = new Meeting("momo", "momo", startTime, endTime);

        // then
        LocalTime meetingLastTimeSlotRepresentative = meeting.getTimeslotInterval().getEndTimeslot().getLocalTime();
        assertThat(meetingLastTimeSlotRepresentative).isEqualTo(endTime.minusMinutes(30));
    }

    @DisplayName("약속을 잠근다.")
    @Test
    void lock() {
        Meeting meeting = MeetingFixture.DINNER.create();

        meeting.lock();

        assertThat(meeting.isLocked()).isTrue();
    }
}
