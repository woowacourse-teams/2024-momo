package kr.momo.domain.meeting;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmedMeetingRepository extends JpaRepository<ConfirmedMeeting, Long> {

    Optional<ConfirmedMeeting> findByMeeting(Meeting meeting);

    boolean existsByMeeting(Meeting meeting);
}
