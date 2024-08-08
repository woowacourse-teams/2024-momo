package kr.momo.controller.annotation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.core.annotation.AliasFor;

@Retention(RetentionPolicy.RUNTIME)
public @interface ApiSuccessResponse {

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(responseCode = "200", description = "OK")
    @interface Ok {
        @AliasFor(annotation = ApiResponse.class, attribute = "description")
        String value() default "";
    }

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(responseCode = "201", description = "Created")
    @interface Created {
        @AliasFor(annotation = ApiResponse.class, attribute = "description")
        String value() default "";
    }

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    @Operation
    @ApiResponse(responseCode = "204", description = "No Content")
    @interface NoContent {
        @AliasFor(annotation = ApiResponse.class, attribute = "description")
        String value() default "";
    }
}
