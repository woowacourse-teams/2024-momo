package kr.momo.domain.confirmedschedule;

import java.util.Optional;
import kr.momo.domain.meeting.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmedScheduleRepository extends JpaRepository<ConfirmedSchedule, Long> {

    Optional<ConfirmedSchedule> findByMeeting(Meeting meeting);

    boolean existsByMeeting(Meeting meeting);
}
