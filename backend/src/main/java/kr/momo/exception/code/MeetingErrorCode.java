package kr.momo.exception.code;

import org.springframework.http.HttpStatus;

public enum MeetingErrorCode implements ErrorCodeType {

    INVALID_UUID(HttpStatus.BAD_REQUEST, "유효하지 않은 UUID 입니다."),
    NOT_FOUND_MEETING(HttpStatus.NOT_FOUND, "존재하지 않는 약속 정보 입니다."),
    INVALID_TIME_RANGE(HttpStatus.BAD_REQUEST, "끝 시간은 시작 시간 이후가 되어야 합니다."),
    MEETING_LOCKED(HttpStatus.BAD_REQUEST, "약속이 잠겨있어 수행할 수 없습니다."),
    MEETING_UNLOCKED(HttpStatus.BAD_REQUEST, "약속이 잠겨있지 않아 수행할 수 없습니다."),
    ALREADY_CONFIRMED(HttpStatus.BAD_REQUEST, "이미 확정된 약속입니다."),
    INVALID_DATETIME_RANGE(HttpStatus.BAD_REQUEST, "날짜 또는 시간이 잘못되었습니다."),
    PAST_NOT_PERMITTED(HttpStatus.BAD_REQUEST, "과거 날짜로는 약속을 생성할 수 없습니다."),
    NOT_CONFIRMED(HttpStatus.NOT_FOUND, "아직 확정되지 않은 약속입니다."),
    UUID_GENERATION_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "약속 생성 과정 중 키 생성에 실패했습니다. 잠시 후 다시 시도해주세요."),
    MEETING_LOAD_FAILURE(HttpStatus.INTERNAL_SERVER_ERROR, "약속 정보를 불러오는데 실패했습니다. 약속을 다시 생성해주세요."),
    INVALID_TYPE(HttpStatus.BAD_REQUEST, "유효하지 않은 약속 유형입니다.");

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
