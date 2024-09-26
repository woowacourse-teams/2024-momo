package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class AttendeePasswordTest {

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @DisplayName("비밀번호와 동일한지 검증한다.")
    @Test
    void verifyMatch() {
        String given = "1234";
        AttendeeRawPassword rawPassword = new AttendeeRawPassword(given);
        AttendeePassword password = new AttendeePassword(rawPassword, passwordEncoder);

        assertThatNoException()
                .isThrownBy(() -> password.verifyMatch(rawPassword, passwordEncoder));
    }

    @DisplayName("암호화된 비밀번호와 서로 다르면 예외를 발생시킨다.")
    @Test
    void throwsExceptionForMismatchedPasswords() {
        String given = "1234";
        AttendeeRawPassword rawPassword = new AttendeeRawPassword(given);
        AttendeeRawPassword other = new AttendeeRawPassword("4321");
        AttendeePassword password = new AttendeePassword(rawPassword, passwordEncoder);

        assertThatThrownBy(() -> password.verifyMatch(other, passwordEncoder))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.PASSWORD_MISMATCHED.message());
    }
}
