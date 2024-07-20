package com.woowacourse.momo.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.woowacourse.momo.auth.dto.TokenInfo;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AuthErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtManager {

    private static final String CLAIM_ID = "attendee_id";
    private static final String CLAIM_NICKNAME = "attendee_nickname";

    private final String secretKey;

    public JwtManager(@Value("${security.jwt.secret_key}") String secretKey) {
        this.secretKey = secretKey;
    }

    public String generate(Attendee attendee) {
        return JWT.create()
                .withClaim(CLAIM_ID, attendee.getId())
                .withClaim(CLAIM_NICKNAME, attendee.getName().getName())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public TokenInfo extract(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        Long id = decodedJWT.getClaim(CLAIM_ID).asLong();
        String nickname = decodedJWT.getClaim(CLAIM_NICKNAME).asString();
        return new TokenInfo(id, nickname);
    }

    private DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (InvalidClaimException e) {
            log.warn("토큰 내 클레임이 유효하지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.INVALID_TOKEN);
        } catch (JWTDecodeException e) {
            log.warn("JWT 토큰 구성이 올바르지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.INVALID_TOKEN);
        } catch (SignatureVerificationException e) {
            log.warn("토큰의 서명이 알고리즘을 사용하여 검증했을 때 유효하지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.INVALID_TOKEN);
        } catch (JWTVerificationException e) {
            log.warn("토큰 검증 과정에서 예기치 못한 에러가 발생하였습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.INVALID_TOKEN);
        }
    }
}
