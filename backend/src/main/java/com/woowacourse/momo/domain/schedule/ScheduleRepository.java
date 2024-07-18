package com.woowacourse.momo.domain.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.meeting.Meeting;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByMeeting(Meeting meeting);

    void deleteAllByMeetingAndAttendee(Meeting meeting, Attendee attendee);
}
