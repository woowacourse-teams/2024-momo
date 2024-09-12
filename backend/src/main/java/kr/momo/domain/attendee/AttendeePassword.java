package kr.momo.domain.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttendeePassword {

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^\\d{4}+$");

    @Convert(converter = PasswordConverter.class)
    @Column(nullable = false)
    private String password;

    public AttendeePassword(String password) {
        validatePassword(password);
        this.password = password;
    }

    private void validatePassword(String password) {
        validatePasswordFormat(password);
    }

    private void validatePasswordFormat(String password) {
        if (!PASSWORD_PATTERN.matcher(password).matches()) {
            throw new MomoException(AttendeeErrorCode.INVALID_PASSWORD_FORMAT);
        }
    }

    public void matchWithRawPassword(AttendeePassword rawPassword, PasswordEncoder passwordEncoder) {
        if (!passwordEncoder.matches(rawPassword.password, password)) {
            throw new MomoException(AttendeeErrorCode.PASSWORD_MISMATCHED);
        }
    }
}
