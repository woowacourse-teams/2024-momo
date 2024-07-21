package com.woowacourse.momo.auth;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import com.woowacourse.momo.auth.dto.TokenInfo;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeePassword;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AuthErrorCode;
import com.woowacourse.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JwtManagerTest {

    private JwtManager jwtManager;
    private long attendeeId;
    private String attendeeName;
    private Attendee attendee;

    @BeforeEach
    void setUp() {
        jwtManager = new JwtManager("secretKey");
        attendeeId = 1L;
        attendeeName = "daon";
        attendee = new Attendee(
                attendeeId,
                MeetingFixture.MOVIE.create(),
                new AttendeeName(attendeeName), new AttendeePassword("1234"),
                Role.GUEST
        );
    }

    @DisplayName("참가자의 정보를 이용하여 jwt 토큰을 발행한다.")
    @Test
    void generate() {
        String token = jwtManager.generate(attendee);
        TokenInfo tokenInfo = jwtManager.extract(token);

        assertSoftly(softAssertions -> {
            softAssertions.assertThat(tokenInfo.id()).isEqualTo(attendeeId);
            softAssertions.assertThat(tokenInfo.nickname()).isEqualTo(attendeeName);
        });
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
