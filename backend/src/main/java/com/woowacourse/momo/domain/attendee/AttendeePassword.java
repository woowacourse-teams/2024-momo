package com.woowacourse.momo.domain.attendee;

import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttendeePassword {

    private String password;

    public AttendeePassword(String password) {
        validatePasswordLength(password);
        this.password = password;
    }

    private void validatePasswordLength(String password) {
        if (password.length() > 20) {
            throw new IllegalArgumentException("비밀번호 길이는 20글자까지 가능합니다.");
        }
    }

    public void verifyPassword(AttendeePassword other) {
        if (!this.equals(other)) {
            throw new MomoException(AttendeeErrorCode.PASSWORD_MISMATCHED);
        }
    }
}
