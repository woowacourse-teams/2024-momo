package com.woowacourse.momo.domain.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByAttendee(Attendee attendee);

    void deleteAllByAttendee(Attendee attendee);
}
