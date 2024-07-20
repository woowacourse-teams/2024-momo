package com.woowacourse.momo.domain.attendee;

import com.woowacourse.momo.domain.BaseEntity;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
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
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "attendee")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Attendee extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @Embedded
    @Column(nullable = false, length = 20)
    private AttendeeName name;

    @Embedded
    @Column(nullable = false, length = 20)
    private AttendeePassword password;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
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

    public void verifyPassword(AttendeePassword other) {
        if (!this.password.equals(other)) {
            throw new MomoException(AttendeeErrorCode.NOT_MATCHES_PASSWORD);
        }
    }
}
