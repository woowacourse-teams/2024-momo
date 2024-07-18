package com.woowacourse.momo.domain.attendee;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    Optional<Attendee> findByName(AttendeeName name);
}
