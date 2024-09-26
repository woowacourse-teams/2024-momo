package kr.momo.domain.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttendeePassword {

    @Column(nullable = false)
    private String password;

    public AttendeePassword(AttendeeRawPassword rawPassword, PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(rawPassword.password());
    }

    public void verifyMatch(AttendeeRawPassword rawPassword, PasswordEncoder passwordEncoder) {
        if (!passwordEncoder.matches(rawPassword.password(), password)) {
            throw new MomoException(AttendeeErrorCode.PASSWORD_MISMATCHED);
        }
    }
}
