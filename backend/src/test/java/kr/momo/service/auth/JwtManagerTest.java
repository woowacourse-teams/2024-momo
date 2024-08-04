package kr.momo.service.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.Duration;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AuthErrorCode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

class JwtManagerTest {

    private JwtManager jwtManager;

    @BeforeEach
    void setUp() {
        JwtProperties jwtProperties = new JwtProperties("secretKey", Duration.ofMinutes(10));
        jwtManager = new JwtManager(jwtProperties);
    }

    @DisplayName("참가자의 정보를 이용하여 jwt 토큰을 발행한다.")
    @Test
    void generate() {
        String token = jwtManager.generate(1L);

        long attendeeId = jwtManager.extract(token);

        assertThat(attendeeId).isEqualTo(1L);
    }

    @DisplayName("토큰이 null이거나 올바르지 않을 경우 예외를 발생시킨다.")
    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"invalidToken"})
    void throwExceptionForInvalidToken(String token) {
        assertThatThrownBy(() -> jwtManager.extract(token))
                .isInstanceOf(MomoException.class)
                .hasMessage(AuthErrorCode.UNAUTHORIZED_TOKEN.message());
    }

    @DisplayName("만료된 토큰일 경우 예외를 발생시킨다.")
    @Test
    void throwExceptionWhenTokenIsExpired() {
        JwtProperties jwtProperties = new JwtProperties("secretKey", Duration.ofMillis(1));
        JwtManager jwtManager = new JwtManager(jwtProperties);
        String token = jwtManager.generate(1L);

        assertThatThrownBy(() -> jwtManager.extract(token))
                .isInstanceOf(MomoException.class)
                .hasMessage(AuthErrorCode.UNAUTHORIZED_TOKEN.message());
    }
}
