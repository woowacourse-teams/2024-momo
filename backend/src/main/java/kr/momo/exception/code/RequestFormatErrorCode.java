package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum RequestFormatErrorCode implements ErrorCodeType {
    INVALID_DATE_FORMAT(HttpStatus.BAD_REQUEST, "날짜 형식이 유효하지 않습니다. ex) 2024-01-01"),
    INVALID_TIME_FORMAT(HttpStatus.BAD_REQUEST, "시간 형식이 유효하지 않습니다. ex) 01:00");

    private final HttpStatus httpStatus;
    private final String message;

    RequestFormatErrorCode(HttpStatus httpStatus, String message) {
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
