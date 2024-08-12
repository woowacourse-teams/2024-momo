package kr.momo.controller.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.RequestFormatErrorCode;

public class DateFormatValidator implements ConstraintValidator<DateFormatConstraint, String>{

    @Override
    public void initialize(DateFormatConstraint constraintAnnotation) {
    }

    @Override
    public boolean isValid(String string, ConstraintValidatorContext constraintValidatorContext) {
        try {
            LocalDate.parse(string, DateTimeFormatter.ISO_LOCAL_DATE);
            return true;
        } catch (DateTimeException dateTimeException) {
            throw new MomoException(RequestFormatErrorCode.INVALID_DATE_FORMAT);
        }
    }
}
