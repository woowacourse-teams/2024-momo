package kr.momo.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Getter;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Getter
@Schema(description = "API 에러 상세 정보")
public class CustomProblemDetail extends ProblemDetail {

    @Schema(description = "에러 코드")
    private final String errorCode;

    @Schema(description = "에러 메시지")
    private List<String> details;

    public CustomProblemDetail(ProblemDetail problemDetail, String errorCode) {
        super(problemDetail);
        this.errorCode = errorCode;
    }

    public CustomProblemDetail(ProblemDetail problemDetail, String errorCode, MethodArgumentNotValidException ex) {
        super(problemDetail);
        this.errorCode = errorCode;
        this.details = getErrors(ex);
    }

    private List<String> getErrors(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getFieldErrors().stream()
                .map(error -> "%s:%s".formatted(error.getField(), error.getDefaultMessage()))
                .toList();
    }
}
