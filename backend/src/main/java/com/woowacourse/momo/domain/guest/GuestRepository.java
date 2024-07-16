package com.woowacourse.momo.domain.guest;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<Guest, Long> {

    Optional<Guest> findByName(GuestName name);
}
