package kr.momo.domain.confirmedschedule;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalTime;
import kr.momo.domain.BaseEntity;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.timeslot.TimeslotInterval;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "confirmed_schedule")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmedSchedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "available_date_id", nullable = false)
    private AvailableDate availableDate;

    @Embedded
    private TimeslotInterval timeslotInterval;

    public ConfirmedSchedule(Meeting meeting, AvailableDate availableDate, LocalTime startTime, LocalTime endTime) {
        this.meeting = meeting;
        this.availableDate = availableDate;
        this.timeslotInterval = new TimeslotInterval(startTime, endTime.minusMinutes(30));
    }
}
