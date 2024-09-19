package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.fixture.AttendeeEncryptedPasswordFixture;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class AttendeeTest {

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @DisplayName("참가자의 비밀번호가 일치하지 않으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfPasswordDoesNotMatch() throws Exception {
        String rawPassword = "1234";
        AttendeePassword attendeePassword = AttendeeEncryptedPasswordFixture.createAttendeePassword(rawPassword);
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee attendee = AttendeeFixture.HOST_JAZZ.create(meeting, attendeePassword);
        AttendeePassword other = new AttendeePassword("9999");

        assertThatThrownBy(() -> attendee.verifyPassword(other, passwordEncoder))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.PASSWORD_MISMATCHED.message());
    }

    @DisplayName("참가자의 비밀번호가 일치하면 정상 기능한다.")
    @Test
    void doesNotThrowExceptionIfPasswordMatches() throws Exception {
        String rawPassword = "1234";
        AttendeePassword attendeePassword = AttendeeEncryptedPasswordFixture.createAttendeePassword(rawPassword);
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee attendee = AttendeeFixture.HOST_JAZZ.create(meeting, attendeePassword);
        AttendeePassword other = new AttendeePassword(rawPassword);

        assertThatNoException()
                .isThrownBy(() -> attendee.verifyPassword(other, passwordEncoder));
    }
}
