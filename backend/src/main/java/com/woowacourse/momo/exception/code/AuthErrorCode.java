package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AuthErrorCode implements ErrorCodeType {

    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않는 토큰입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    AuthErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
