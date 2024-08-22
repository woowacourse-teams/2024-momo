package kr.momo.domain.schedule;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import kr.momo.domain.timeslot.Timeslot;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DateAndTimeslotTest {

    @DisplayName("DateTimeInterval로 변환 시 자정")
    @Test
    void convertToDateTimeInterval() {
        // given
        LocalDate today = LocalDate.now();
        DateAndTimeslot dateAndTimeslot = new DateAndTimeslot(today, Timeslot.TIME_2330);

        // when
        DateTimeInterval dateTimeInterval = dateAndTimeslot.toDateTimeInterval();

        // then
        LocalDate startDate = dateTimeInterval.startDateTime().toLocalDate();
        LocalDate endDate = dateTimeInterval.endDateTime().toLocalDate();
        assertAll(
                () -> assertThat(startDate).isEqualTo(today),
                () -> assertThat(endDate).isEqualTo(today.plusDays(1))
        );
    }
}
