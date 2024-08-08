package kr.momo.domain.meeting;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import kr.momo.domain.BaseEntity;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.schedule.Schedule;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "confirmed_meeting")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmedMeeting extends BaseEntity {

    private static final int SECOND_OF_HALF_HOUR = 30 * 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    public ConfirmedMeeting(Meeting meeting, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        this.meeting = meeting;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    public List<Attendee> availableAttendeesOf(List<Schedule> schedules) {
        Map<Attendee, Long> groupAttendeeByScheduleCount = schedules.stream()
                .filter(this::isScheduleWithinDateTimeRange)
                .collect(groupingBy(Schedule::getAttendee, counting()));

        long confirmedTimeSlotCount = countTimeSlotOfConfirmedMeeting();

        return groupAttendeeByScheduleCount.entrySet().stream()
                .filter(entry -> entry.getValue() == confirmedTimeSlotCount)
                .map(Map.Entry::getKey)
                .toList();
    }

    public boolean isScheduleWithinDateTimeRange(Schedule schedule) {
        LocalDateTime dateTime = schedule.dateTime();
        return !(dateTime.isBefore(startDateTime) || dateTime.isAfter(endDateTime));
    }

    private long countTimeSlotOfConfirmedMeeting() {
        return (endDateTime.toEpochSecond(ZoneOffset.UTC) - startDateTime.toEpochSecond(ZoneOffset.UTC))
                / SECOND_OF_HALF_HOUR;
    }
}
