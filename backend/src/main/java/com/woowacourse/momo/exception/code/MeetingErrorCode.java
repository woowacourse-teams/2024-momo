package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum MeetingErrorCode implements ErrorCodeType {

    INVALID_UUID(HttpStatus.BAD_REQUEST, "유효하지 않은 UUID 입니다."),
    INVALID_TIME_RANGE(HttpStatus.BAD_REQUEST, "끝 시간은 시작 시간 이후가 되어야 합니다.");

    private final HttpStatus httpStatus;
    private final String message;

    MeetingErrorCode(HttpStatus httpStatus, String message) {
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
