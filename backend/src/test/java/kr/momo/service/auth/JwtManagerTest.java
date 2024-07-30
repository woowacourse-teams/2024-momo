package kr.momo.service.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeePassword;
import kr.momo.domain.attendee.Role;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AuthErrorCode;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JwtManagerTest {

    private final JwtManager jwtManager = new JwtManager("secretKey");

    @DisplayName("참가자의 정보를 이용하여 jwt 토큰을 발행한다.")
    @Test
    void generate() {
        AttendeeName name = new AttendeeName("attendee");
        AttendeePassword password = new AttendeePassword("password");
        Attendee attendee = new Attendee(1L, MeetingFixture.DINNER.create(), name, password, Role.GUEST);

        String token = jwtManager.generate(attendee.getId());
        long attendeeId = jwtManager.extract(token);

        assertThat(attendeeId).isEqualTo(attendee.getId());
    }

    @DisplayName("토큰이 올바르지 않을 경우 예외를 발생시킨다.")
    @Test
    void throwExceptionForInvalidToken() {
        String token = "invalidToken";

        assertThatThrownBy(() -> jwtManager.extract(token))
                .isInstanceOf(MomoException.class)
                .hasMessage(AuthErrorCode.INVALID_TOKEN.message());
    }
}
