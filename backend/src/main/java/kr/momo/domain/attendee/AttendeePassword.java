package kr.momo.domain.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.regex.Pattern;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttendeePassword {

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^[a-zA-Z0-9!@*#$%]+$");

    @Column(nullable = false, length = 10)
    private String password;

    public AttendeePassword(String password) {
        validatePassword(password);
        this.password = password;
    }

    private void validatePassword(String password) {
        validatePasswordLength(password);
        validatePasswordFormat(password);
    }

    private void validatePasswordLength(String password) {
        if (password.length() > 10) {
            throw new MomoException(AttendeeErrorCode.INVALID_PASSWORD_LENGTH);
        }
    }

    private void validatePasswordFormat(String password) {
        if (!PASSWORD_PATTERN.matcher(password).matches()) {
            throw new MomoException(AttendeeErrorCode.INVALID_PASSWORD_FORMAT);
        }
    }

    public void verifyPassword(AttendeePassword other) {
        if (!this.equals(other)) {
            throw new MomoException(AttendeeErrorCode.PASSWORD_MISMATCHED);
        }
    }
}
