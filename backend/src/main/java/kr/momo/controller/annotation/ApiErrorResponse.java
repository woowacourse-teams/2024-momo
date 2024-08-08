package kr.momo.controller.annotation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import kr.momo.exception.CustomProblemDetail;
import org.springframework.core.annotation.AliasFor;
import org.springframework.http.MediaType;

@Retention(RetentionPolicy.RUNTIME)
public @interface ApiErrorResponse {

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(
            responseCode = "400",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = CustomProblemDetail.class)
            )
    )
    @interface BadRequest {
        @AliasFor(annotation = ApiResponse.class, attribute = "description") String value() default "";
    }

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(
            responseCode = "401",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = CustomProblemDetail.class)
            )
    )
    @interface Unauthorized {
        @AliasFor(annotation = ApiResponse.class, attribute = "description") String value() default "";
    }

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(
            responseCode = "403",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = CustomProblemDetail.class)
            )
    )
    @interface Forbidden {
        @AliasFor(annotation = ApiResponse.class, attribute = "description") String value() default "";
    }

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(
            responseCode = "404",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = CustomProblemDetail.class)
            )
    )
    @interface NotFound {
        @AliasFor(annotation = ApiResponse.class, attribute = "description") String value() default "";
    }
}
