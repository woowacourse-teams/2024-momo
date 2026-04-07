package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum ScheduleErrorCode implements ErrorCodeType {

    INVALID_SCHEDULE_TIMESLOT(HttpStatus.BAD_REQUEST, "해당 시간을 선택할 수 없습니다. 주최자가 설정한 시간만 선택 가능합니다."),
    INVALID_SCHEDULE_RECOMMEND_TYPE(HttpStatus.BAD_REQUEST, "해당 추천 기준이 없습니다."),
    INVALID_MIN_TIME(HttpStatus.BAD_REQUEST, "최소 시간 입력이 잘못되었습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;

    ScheduleErrorCode(HttpStatus httpStatus, String message) {
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
