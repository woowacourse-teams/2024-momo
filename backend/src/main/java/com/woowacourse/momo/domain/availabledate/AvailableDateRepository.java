package com.woowacourse.momo.domain.availabledate;

import com.woowacourse.momo.domain.meeting.Meeting;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailableDateRepository extends JpaRepository<AvailableDate, Long> {

    Optional<AvailableDate> findByMeetingAndDate(Meeting meeting, LocalDate date);

    List<AvailableDate> findAllByMeeting(Meeting meeting);
}
