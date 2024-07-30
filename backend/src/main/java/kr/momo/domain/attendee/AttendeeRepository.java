package kr.momo.domain.attendee;

import java.util.List;
import java.util.Optional;
import kr.momo.domain.meeting.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    Optional<Attendee> findByMeetingAndName(Meeting meeting, AttendeeName name);

    List<Attendee> findAllByMeeting(Meeting meeting);

    Optional<Attendee> findByIdAndMeeting(long id, Meeting meeting);
}
