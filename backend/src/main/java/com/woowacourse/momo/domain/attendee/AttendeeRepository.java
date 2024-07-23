package com.woowacourse.momo.domain.attendee;

import com.woowacourse.momo.domain.meeting.Meeting;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    Optional<Attendee> findByName(AttendeeName name);

    Optional<Attendee> findByMeetingAndName(Meeting meeting, AttendeeName name);

    Optional<Attendee> findByMeetingAndRole(Meeting meeting, Role role);
}
