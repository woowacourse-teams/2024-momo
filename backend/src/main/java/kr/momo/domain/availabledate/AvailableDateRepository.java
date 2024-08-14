package kr.momo.domain.availabledate;

import java.util.List;
import kr.momo.domain.meeting.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailableDateRepository extends JpaRepository<AvailableDate, Long> {

    List<AvailableDate> findAllByMeeting(Meeting meeting);
}
