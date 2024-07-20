package com.woowacourse.momo.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String ERROR_CODE = "errorCode";
    private static final String INTERNAL_SERVER_ERROR_MESSAGE = "예기치 못한 서버 에러가 발생했습니다.";

    @ExceptionHandler
    public ProblemDetail handleMomoException(MomoException ex) {
        log.warn(ex.message(), ex);

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.httpStatus(), ex.message());
        problemDetail.setProperty(ERROR_CODE, ex.errorCode());
        return problemDetail;
    }

    @ExceptionHandler
    public ProblemDetail handleInternalException(Exception ex) {
        log.error(ex.getMessage(), ex);
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_MESSAGE);
    }
}
