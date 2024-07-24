package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum TimeslotErrorCode implements ErrorCodeType {

    INVALID_TIMESLOT(HttpStatus.BAD_REQUEST, "유효한 시간이 아닙니다. 선택한 시간을 사용할 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    TimeslotErrorCode(HttpStatus httpStatus, String message) {
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
