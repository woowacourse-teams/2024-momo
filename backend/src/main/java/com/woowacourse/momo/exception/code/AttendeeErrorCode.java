package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AttendeeErrorCode implements ErrorCodeType {

    INVALID_UUID(HttpStatus.BAD_REQUEST, "유효하지 않은 UUID 입니다."),
    NOT_MATCHES_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    AttendeeErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    @Override
    public String message() {
        return message;
    }

    @Override
    public HttpStatus httpStatus() {
        return httpStatus;
    }
}
