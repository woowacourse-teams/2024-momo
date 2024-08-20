package kr.momo.domain.schedule;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @EntityGraph(attributePaths = {"availableDate"})
    List<Schedule> findAllByAttendee(Attendee attendee);

    @EntityGraph(attributePaths = {"availableDate"})
    List<Schedule> findAllByAttendeeIn(List<Attendee> attendees);

    @Modifying
    @Query("DELETE FROM Schedule s WHERE s.attendee = :attendee")
    void deleteByAttendee(Attendee attendee);
}
