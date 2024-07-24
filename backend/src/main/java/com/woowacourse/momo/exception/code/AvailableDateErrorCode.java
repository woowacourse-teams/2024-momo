package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AvailableDateErrorCode implements ErrorCodeType {

    DUPLICATED_DATE(HttpStatus.BAD_REQUEST, "같은 날짜를 중복으로 선택할 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    AvailableDateErrorCode(HttpStatus httpStatus, String message) {
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
