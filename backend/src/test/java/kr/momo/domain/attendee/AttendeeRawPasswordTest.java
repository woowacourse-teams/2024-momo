package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

class AttendeeRawPasswordTest {

    @DisplayName("참가자 비밀번호가 숫자가 아니거나 4자를 초과하면 예외를 발생시킨다.")
    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"invalid_password_length", "1@13", "  ", "mo12"})
    void throwsExceptionIfAttendeePasswordIsTooLong(String given) {
        assertThatThrownBy(() -> new AttendeeRawPassword(given))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_PASSWORD_FORMAT.message());
    }
}
