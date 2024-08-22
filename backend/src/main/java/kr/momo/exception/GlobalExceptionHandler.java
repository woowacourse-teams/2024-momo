package kr.momo.exception;

import kr.momo.config.interceptor.LogInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final String INTERNAL_SERVER_ERROR_MESSAGE = "예기치 못한 서버 에러가 발생했습니다.";
    private static final String INVALID_REQUEST_FORMAT_MESSAGE = "유효하지 않은 요청입니다.";
    private static final String INVALID_REQUEST_FORMAT_ERROR_CODE = "INVALID_FORMAT_REQUEST";
    private static final String EXCEPTION_LOG_FORMAT = "Exception Handler [{}]";

    @ExceptionHandler
    public ProblemDetail handleMomoException(MomoException ex) {
        String traceId = MDC.get(LogInterceptor.TRACE_ID);
        log.warn(EXCEPTION_LOG_FORMAT, traceId, ex);

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(ex.httpStatus(), ex.message());
        return new CustomProblemDetail(problemDetail, ex.errorCode());
    }

    @ExceptionHandler
    public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        String traceId = MDC.get(LogInterceptor.TRACE_ID);
        log.warn(EXCEPTION_LOG_FORMAT, traceId, ex);

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST, INVALID_REQUEST_FORMAT_MESSAGE
        );
        return new CustomProblemDetail(problemDetail, INVALID_REQUEST_FORMAT_ERROR_CODE, ex);
    }

    @ExceptionHandler
    public ProblemDetail handleInternalException(Exception ex) {
        String traceId = MDC.get(LogInterceptor.TRACE_ID);
        log.error(EXCEPTION_LOG_FORMAT, traceId, ex);

        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_MESSAGE);
    }
}
