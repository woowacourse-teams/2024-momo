package com.woowacourse.momo.service.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record AttendeesScheduleResponse(
        LocalDate date,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime time,
        List<String> attendeeNames
) {

}
