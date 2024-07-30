package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum AvailableDateErrorCode implements ErrorCodeType {

    INVALID_AVAILABLE_DATE(HttpStatus.BAD_REQUEST, "약속 가능한 날짜가 아닙니다. 다른 날짜를 선택해 주세요."),
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
