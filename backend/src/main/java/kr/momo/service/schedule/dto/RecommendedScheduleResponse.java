package kr.momo.service.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.IntStream;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.recommend.CandidateSchedule;

public record RecommendedScheduleResponse(

        @Schema(description = "추천 순위", example = "1")
        int rank,

        @Schema(description = "추천 일정 시작 일자")
        @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        LocalDate startDate,

        @Schema(description = "추천 일정 시작 요일", example = "토")
        String startDayOfWeek,

        @Schema(description = "추천 일정 시작 시각", type = "string", pattern = "HH:mm", example = "14:00")
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        LocalTime startTime,

        @Schema(description = "추천 일정 종료 일자", example = "2024-08-31")
        @JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        LocalDate endDate,

        @Schema(description = "추천 일정 종료 요일", example = "일")
        String endDayOfWeek,

        @Schema(description = "추천 일정 종료 시각", type = "string", pattern = "HH:mm", example = "22:30")
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        LocalTime endTime,

        @Schema(description = "참여자 이름 목록", example = "[\"페드로\", \"재즈\", \"모모\"]")
        List<String> attendeeNames
) {

    public static RecommendedScheduleResponse of(
            int rank, LocalDateTime startTime, LocalDateTime endTime, AttendeeGroup attendeeGroup
    ) {
        List<String> attendeeNames = attendeeGroup.getAttendees().stream()
                .map(Attendee::name)
                .toList();
        return new RecommendedScheduleResponse(
                rank,
                startTime.toLocalDate(),
                startTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREA),
                startTime.toLocalTime(),
                endTime.toLocalDate(),
                endTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.KOREA),
                endTime.toLocalTime(),
                attendeeNames
        );
    }

    public static List<RecommendedScheduleResponse> fromCandidateSchedules(List<CandidateSchedule> candidateSchedules) {
        return IntStream.range(0, candidateSchedules.size())
                .mapToObj(idx -> RecommendedScheduleResponse.of(
                        idx + 1,
                        candidateSchedules.get(idx).startDateTime(),
                        candidateSchedules.get(idx).endDateTime(),
                        candidateSchedules.get(idx).attendeeGroup()
                ))
                .toList();
    }
}
