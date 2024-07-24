package com.woowacourse.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeePasswordTest {

    @DisplayName("참가자 비밀번호가 20글자를 초과하면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfAttendeePasswordIsTooLong() {
        assertThatThrownBy(() -> new AttendeePassword("invalid_password_length_invalid_password_length"))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_PASSWORD_LENGTH.message());
    }

    @DisplayName("참가자 비밀번호 객체가 정상 생성된다.")
    @Test
    void createAttendeePasswordObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new AttendeePassword("momo"));
    }

    @DisplayName("비밀번호가 서로 다르면 예외를 발생시킨다.")
    @Test
    void throwsExceptionForMismatchedPasswords() {
        AttendeePassword password = new AttendeePassword("1234");
        AttendeePassword other = new AttendeePassword("123456");

        assertThatThrownBy(() -> password.verifyPassword(other))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.PASSWORD_MISMATCHED.message());
    }
}
