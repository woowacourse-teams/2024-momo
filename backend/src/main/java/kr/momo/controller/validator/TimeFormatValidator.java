package kr.momo.controller.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class TimeFormatValidator implements ConstraintValidator<TimeFormatConstraint, String> {

    @Override
    public boolean isValid(String string, ConstraintValidatorContext constraintValidatorContext) {
        try {
            LocalTime.parse(string, DateTimeFormatter.ofPattern("HH:mm"));
        } catch (DateTimeParseException ex) {
            return false;
        }
        return true;
    }
}
