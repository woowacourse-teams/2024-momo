package kr.momo.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AuthErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtManager {

    private static final String CLAIM_ID = "id";

    private final JwtProperties jwtProperties;

    public String generate(long id) {
        Date expirationDate = new Date(System.currentTimeMillis() + jwtProperties.getExpirationPeriodInMillis());
        return JWT.create()
                .withClaim(CLAIM_ID, id)
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(jwtProperties.getSecretKey()));
    }

    public long extract(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getClaim(CLAIM_ID).asLong();
    }

    private DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtProperties.getSecretKey());
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (InvalidClaimException e) {
            log.warn("토큰 내 클레임이 유효하지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.UNAUTHORIZED_TOKEN);
        } catch (JWTDecodeException e) {
            log.warn("JWT 토큰 구성이 올바르지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.UNAUTHORIZED_TOKEN);
        } catch (SignatureVerificationException e) {
            log.warn("토큰의 서명이 알고리즘을 사용하여 검증했을 때 유효하지 않습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.UNAUTHORIZED_TOKEN);
        } catch (JWTVerificationException e) {
            log.warn("토큰 검증 과정에서 예기치 못한 에러가 발생하였습니다. {} ", e.getMessage());
            throw new MomoException(AuthErrorCode.UNAUTHORIZED_TOKEN);
        }
    }
}
