package kr.momo.domain.schedule;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByAttendee(Attendee attendee);

    List<Schedule> findAllByAttendeeIn(List<Attendee> attendees);

    void deleteAllByAttendee(Attendee attendee);
}
