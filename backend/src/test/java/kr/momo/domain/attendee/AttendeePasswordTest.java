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

    @DisplayName("참가자 비밀번호 객체가 정상 생성된다.")
    @Test
    void createAttendeePasswordObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new AttendeePassword("1234"));
    }

    @DisplayName("참가자 비밀번호가 숫자가 아니거나 4자를 초과하면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfAttendeePasswordIsTooLong() {
        assertThatThrownBy(() -> new AttendeePassword("invalid_password_length_invalid_password_length"))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_PASSWORD_FORMAT.message());
    }

    @DisplayName("비밀번호와 동일한지 검증한다.")
    @Test
    void matchWithRawPassword() throws Exception {
        String rawPassword = "1234";
        AttendeePassword password = AttendeeEncryptedPasswordFixture.createAttendeePassword(rawPassword);
        AttendeePassword other = new AttendeePassword(rawPassword);

        assertThatNoException()
                .isThrownBy(() -> password.matchWithRawPassword(other, passwordEncoder));
    }

    @DisplayName("암호화된 비밀번호와 서로 다르면 예외를 발생시킨다.")
    @Test
    void throwsExceptionForMismatchedPasswords() throws Exception {
        String rawPassword = "1234";
        AttendeePassword password = AttendeeEncryptedPasswordFixture.createAttendeePassword(rawPassword);
        AttendeePassword other = new AttendeePassword("4321");

        assertThatThrownBy(() -> password.matchWithRawPassword(other, passwordEncoder))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.PASSWORD_MISMATCHED.message());
    }
}
