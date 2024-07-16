package com.woowacourse.momo.domain.schedule;

import com.woowacourse.momo.domain.guest.Guest;
import com.woowacourse.momo.domain.meeting.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    void deleteAllByMeetingAndGuest(Meeting meeting, Guest guest);
}
