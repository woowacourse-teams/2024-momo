package kr.momo.service.schedule.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "일정 추천 요청")
public record ScheduleRecommendRequest(

        @NotEmpty
        @Schema(description = "추천 기준(이른 시간 순 / 길게 볼 수 있는 순)", example = "earliest")
        String recommendType,

        @NotEmpty
        @Schema(description = "추천 대상 참여자 이름", example = "페드로, 재즈, 모모")
        List<String> attendeeNames,

        @Schema(description = "최소 만남 시간(시간 단위)", example = "0, 1, 2, 3")
        @Min(value = 0, message = "최소 시간은 0보다 작을 수 없습니다.")
        Integer minTime
) {

    public ScheduleRecommendRequest {
        if (minTime == null) {
            minTime = 0;
        }
    }
}
