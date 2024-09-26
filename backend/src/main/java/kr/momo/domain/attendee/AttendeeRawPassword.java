package kr.momo.domain.attendee;

import java.util.regex.Pattern;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;

public record AttendeeRawPassword(String password) {

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^\\d{4}+$");

    public AttendeeRawPassword {
        validatePassword(password);
    }

    private void validatePassword(String password) {
        if (password == null || !PASSWORD_PATTERN.matcher(password).matches()) {
            throw new MomoException(AttendeeErrorCode.INVALID_PASSWORD_FORMAT);
        }
    }
}
