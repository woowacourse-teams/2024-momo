package kr.momo.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.ProblemDetail;

@Getter
@Schema(description = "API 에러 상세 정보")
public class CustomProblemDetail extends ProblemDetail {

    @Schema(description = "에러 코드")
    private final String errorCode;

    public CustomProblemDetail(ProblemDetail problemDetail, String errorCode) {
        super(problemDetail);
        this.errorCode = errorCode;
    }
}
