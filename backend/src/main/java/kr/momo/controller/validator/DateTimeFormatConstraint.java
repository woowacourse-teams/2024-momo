package kr.momo.controller.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Documented
@Constraint(validatedBy = DateTimeFormatValidator.class)
@Target({ElementType.FIELD, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface DateTimeFormatConstraint {

    String message() default "유효하지 않은 날짜시간 형식입니다 ex)2024-08-13 17:33";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
