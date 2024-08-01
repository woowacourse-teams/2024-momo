package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum ConfirmedScheduleErrorCode implements ErrorCodeType {

    CONFIRMED_SCHEDULE_EXISTS(HttpStatus.BAD_REQUEST, "이미 확정된 약속입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ConfirmedScheduleErrorCode(HttpStatus httpStatus, String message) {
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
