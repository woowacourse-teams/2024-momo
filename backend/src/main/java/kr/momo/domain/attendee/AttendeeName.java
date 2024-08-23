package kr.momo.domain.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttendeeName {

    @Column(nullable = false, length = 5)
    private String name;

    public AttendeeName(String name) {
        validateNameLength(name);
        this.name = name;
    }

    private void validateNameLength(String name) {
        if (name.length() > 5) {
            throw new MomoException(AttendeeErrorCode.INVALID_NAME_LENGTH);
        }
    }
}
