package kr.momo.domain.schedule;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @EntityGraph(attributePaths = {"availableDate"})
    List<Schedule> findAllByAttendee(Attendee attendee);

    @EntityGraph(attributePaths = {"availableDate"})
    List<Schedule> findAllByAttendeeIn(List<Attendee> attendees);

    @Modifying
    @Transactional
    @Query("DELETE FROM Schedule s WHERE s.attendee = :attendee")
    void deleteByAttendee(Attendee attendee);

    @Query("""
            SELECT
                new kr.momo.domain.schedule.DateAndTimeslot(ad.date, s.timeslot)
            FROM Schedule s
            JOIN s.availableDate ad
            WHERE s.attendee IN :essentialAttendees
            GROUP BY ad.date, s.timeslot
            HAVING COUNT(s.attendee.id) = :#{#essentialAttendees.size()}
            ORDER BY ad.date ASC, s.timeslot ASC
            """)
    List<DateAndTimeslot> findAllDateAndTimeslotByEssentialAttendees(
            @Param("essentialAttendees") List<Attendee> essentialAttendees
    );
}
