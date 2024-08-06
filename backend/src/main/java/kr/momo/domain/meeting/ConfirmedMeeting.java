package kr.momo.domain.meeting;

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
import kr.momo.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "confirmed_schedule")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConfirmedMeeting extends BaseEntity {

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
}
