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
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import kr.momo.domain.BaseEntity;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.Schedule;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "confirmed_meeting")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmedMeeting extends BaseEntity {

    private static final long SECOND_OF_HALF_HOUR = 30 * 60;

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

    public AttendeeGroup availableAttendeesOf(List<Schedule> schedules) {
        Map<Attendee, Long> groupAttendeeByScheduleCount = schedules.stream()
                .filter(this::isScheduleWithinDateTimeRange)
                .collect(groupingBy(Schedule::getAttendee, counting()));

        long confirmedTimeSlotCount = countTimeSlotOfConfirmedMeeting();
        List<Attendee> availableAttendees = groupAttendeeByScheduleCount.keySet().stream()
                .filter(key -> groupAttendeeByScheduleCount.get(key) == confirmedTimeSlotCount)
                .toList();
        return new AttendeeGroup(availableAttendees);
    }

    private boolean isScheduleWithinDateTimeRange(Schedule schedule) {
        LocalDateTime dateTime = schedule.dateTime();
        return !dateTime.isBefore(startDateTime) && dateTime.isBefore(endDateTime);
    }

    private long countTimeSlotOfConfirmedMeeting() {
        return Duration.between(startDateTime, endDateTime).dividedBy(SECOND_OF_HALF_HOUR).getSeconds();
    }
}
