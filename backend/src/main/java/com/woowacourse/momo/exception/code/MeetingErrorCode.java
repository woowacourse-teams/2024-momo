package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum MeetingErrorCode implements ErrorCodeType {

    INVALID_UUID(HttpStatus.BAD_REQUEST, "유효하지 않은 UUID 입니다.");

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
