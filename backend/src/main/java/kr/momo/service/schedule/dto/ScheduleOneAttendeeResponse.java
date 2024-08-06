package kr.momo.service.schedule.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import kr.momo.domain.attendee.Attendee;

@Schema(description = "특정 참가자의 일정 응답")
public record ScheduleOneAttendeeResponse(

        @Schema(description = "참가자 이름", example = "모모")
        String attendeeName,

        @Schema(description = "참가자의 일정 목록")
        List<ScheduleDateTimesResponse> schedules
) {
    public static ScheduleOneAttendeeResponse of(Attendee attendee, List<ScheduleDateTimesResponse> dateTimes) {
        return new ScheduleOneAttendeeResponse(attendee.name(), dateTimes);
    }
}
