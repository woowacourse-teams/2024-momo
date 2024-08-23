package kr.momo.exception;

import kr.momo.exception.code.ErrorCodeType;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MomoException extends RuntimeException {

    private final ErrorCodeType errorCodeType;

    public MomoException(ErrorCodeType errorCodeType) {
        super(errorCodeType.message());
        this.errorCodeType = errorCodeType;
    }

    public HttpStatus httpStatus() {
        return errorCodeType.httpStatus();
    }

    public String message() {
        return errorCodeType.message();
    }

    public String errorCode() {
        return errorCodeType.errorCode();
    }
}
