package kr.momo.domain.schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import kr.momo.domain.BaseEntity;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.timeslot.Timeslot;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "schedule")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attendee_id", nullable = false)
    private Attendee attendee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "available_date_id", nullable = false)
    private AvailableDate availableDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Timeslot timeslot;

    public Schedule(Attendee attendee, AvailableDate availableDate, Timeslot timeslot) {
        this.attendee = attendee;
        this.availableDate = availableDate;
        this.timeslot = timeslot;
    }

    public LocalDateTime dateTime() {
        return LocalDateTime.of(availableDate.getDate(), timeslot.startTime());
    }

    public LocalDate date() {
        return availableDate.getDate();
    }

    public LocalTime time() {
        return timeslot.startTime();
    }

    public String attendeeName() {
        return attendee.name();
    }
}
