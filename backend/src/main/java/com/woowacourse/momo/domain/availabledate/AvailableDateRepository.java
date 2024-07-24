package com.woowacourse.momo.domain.availabledate;

import com.woowacourse.momo.domain.meeting.Meeting;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailableDateRepository extends JpaRepository<AvailableDate, Long> {

    List<AvailableDate> findAllByMeeting(Meeting meeting);
}
