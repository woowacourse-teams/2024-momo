package kr.momo.service.schedule.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
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
        int rank,
        LocalDate startDate,
        String startDayOfWeek,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime startTime,
        LocalDate endDate,
        String endDayOfWeek,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime endTime,
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
                        idx+1,
                        candidateSchedules.get(idx).startDateTime(),
                        candidateSchedules.get(idx).endDateTime(),
                        candidateSchedules.get(idx).attendeeGroup()
                ))
                .toList();
    }
}
