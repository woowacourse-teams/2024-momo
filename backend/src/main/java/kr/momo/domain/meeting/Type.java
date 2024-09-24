package kr.momo.domain.meeting;

import com.fasterxml.jackson.annotation.JsonCreator;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;

public enum Type {
    DAYSONLY,
    DATETIME;

    public boolean isDaysOnly() {
        return this.equals(DAYSONLY);
    }

    @JsonCreator
    public static Type from(String type) {
        try {
            return Type.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new MomoException(MeetingErrorCode.INVALID_TYPE);
        }
    }
}
