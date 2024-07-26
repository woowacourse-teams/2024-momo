package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AuthErrorCode implements ErrorCodeType {

    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다."),
    NOT_FOUND_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    AuthErrorCode(HttpStatus httpStatus, String message) {
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
