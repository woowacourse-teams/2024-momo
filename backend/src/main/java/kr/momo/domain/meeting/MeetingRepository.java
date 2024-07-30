package kr.momo.domain.meeting;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    Optional<Meeting> findByUuid(String uuid);
}
