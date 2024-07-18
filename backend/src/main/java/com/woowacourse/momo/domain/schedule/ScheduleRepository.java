package com.woowacourse.momo.domain.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    void deleteAllByAttendee(Attendee attendee);
}
