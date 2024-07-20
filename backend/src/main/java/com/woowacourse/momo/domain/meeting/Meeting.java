package com.woowacourse.momo.domain.meeting;

import com.woowacourse.momo.domain.BaseEntity;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "meeting")
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, length = 40)
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot firstTimeslot;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Timeslot lastTimeslot;

    public Meeting(String name, String uuid, Timeslot firstTimeslot, Timeslot lastTimeslot) {
        this.name = name;
        this.uuid = uuid;
        this.firstTimeslot = firstTimeslot;
        this.lastTimeslot = lastTimeslot;
    }
}
