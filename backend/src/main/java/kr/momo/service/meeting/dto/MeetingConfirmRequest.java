package kr.momo.service.meeting.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import kr.momo.controller.validator.DateFormatConstraint;
import kr.momo.controller.validator.TimeFormatConstraint;

public record MeetingConfirmRequest(

        @NotNull
        @DateFormatConstraint
        String startDate,
        @NotNull
        @TimeFormatConstraint
        String startTime,
        @NotNull
        @DateFormatConstraint
        String endDate,
        @NotNull
        @TimeFormatConstraint
        String endTime
) {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE;
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");


    public MeetingConfirmRequest(LocalDate startDate, LocalTime startTime, LocalDate endDate, LocalTime endTime) {
        this(
                startDate.format(dateFormatter),
                startTime.format(timeFormatter),
                endDate.format(dateFormatter),
                endTime.format(timeFormatter)
        );
    }


    public LocalDateTime toStartDateTime() {
        return LocalDateTime.parse(startDate + " " + startTime, dateTimeFormatter);
    }

    public LocalDateTime toEndDateTime() {
        return LocalDateTime.parse(endDate + " " + endTime, dateTimeFormatter);
    }
}
