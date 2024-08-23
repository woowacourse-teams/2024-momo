package kr.momo.domain.attendee;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
import kr.momo.domain.BaseEntity;
import kr.momo.domain.meeting.Meeting;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "attendee")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(callSuper = false)
public class Attendee extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @Embedded
    private AttendeeName name;

    @Embedded
    private AttendeePassword password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Role role;

    public Attendee(Meeting meeting, AttendeeName name, AttendeePassword password, Role role) {
        this.meeting = meeting;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public Attendee(Meeting meeting, String name, String password, Role role) {
        this(meeting, new AttendeeName(name), new AttendeePassword(password), role);
    }

    public boolean isHost() {
        return role.isHost();
    }

    public boolean isNotHost() {
        return !isHost();
    }

    public void verifyPassword(AttendeePassword other) {
        this.password.verifyPassword(other);
    }

    public String name() {
        return this.name.getName();
    }

    public String password() {
        return this.password.getPassword();
    }
}
