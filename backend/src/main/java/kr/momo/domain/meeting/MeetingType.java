package kr.momo.domain.meeting;

import com.fasterxml.jackson.annotation.JsonCreator;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;

public enum MeetingType {

    DAYSONLY,
    DATETIME;

    public boolean isDaysOnly() {
        return this.equals(DAYSONLY);
    }

    @JsonCreator
    public static MeetingType from(String type) {
        try {
            return MeetingType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new MomoException(MeetingErrorCode.INVALID_TYPE);
        }
    }
}
