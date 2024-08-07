package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AttendeeErrorCode implements ErrorCodeType {

    INVALID_NAME_LENGTH(HttpStatus.BAD_REQUEST, "이름 길이는 최대 20글자까지 가능합니다."),
    INVALID_PASSWORD_LENGTH(HttpStatus.BAD_REQUEST, "비밀번호 길이는 최대 20글자까지 가능합니다."),
    PASSWORD_MISMATCHED(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_ATTENDEE(HttpStatus.BAD_REQUEST, "해당 약속에 참여하는 참가자 정보가 없습니다."),
    NOT_FOUND_ATTENDEE(HttpStatus.NOT_FOUND, "해당 약속에 참여하는 참가자 정보가 없습니다."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "접근이 거부되었습니다."),
    DUPLICATED_ATTENDEE_NAME(HttpStatus.BAD_REQUEST, "참여자의 이름이 중복됩니다."),
    INVALID_ATTENDEE_SIZE(HttpStatus.BAD_REQUEST, "참여자의 수는 최소 1명입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    AttendeeErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }

    @Override
    public String message() {
        return message;
    }

    @Override
    public String errorCode() {
        return name();
    }
}
