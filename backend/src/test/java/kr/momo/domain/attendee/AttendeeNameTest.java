package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeeNameTest {

    @DisplayName("참여자 이름이 20글자를 초과하면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfAttendeeNameIsTooLong() {
        assertThatThrownBy(() -> new AttendeeName("invalid_name_length_invalid_name_length"))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_NAME_LENGTH.message());
    }

    @DisplayName("참여자 이름 객체가 정상 생성된다.")
    @Test
    void createAttendeeNameObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new AttendeeName("momo"));
    }
}
