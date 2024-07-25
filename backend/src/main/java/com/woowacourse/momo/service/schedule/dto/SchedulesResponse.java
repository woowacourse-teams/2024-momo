package com.woowacourse.momo.service.schedule.dto;

import java.util.List;

public record SchedulesResponse(List<AttendeesScheduleResponse> schedules) {
    public static SchedulesResponse from(List<AttendeesScheduleResponse> response) {
        return new SchedulesResponse(response);
    }
}
