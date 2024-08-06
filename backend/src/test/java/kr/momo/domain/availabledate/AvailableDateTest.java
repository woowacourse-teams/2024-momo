package kr.momo.domain.availabledate;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import kr.momo.domain.meeting.Meeting;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class AvailableDateTest {

    @DisplayName("이용 가능한 날짜가 과거인지 검증한다.")
    @ParameterizedTest
    @CsvSource(value = {"-2,true", "-1,true", "0,false", "1,false"})
    void isBefore(int plusDays, boolean expected) {
        Meeting meeting = MeetingFixture.GAME.create();
        LocalDate today = LocalDate.now();
        LocalDate given = today.plusDays(plusDays);
        AvailableDate availableDate = new AvailableDate(given, meeting);

        boolean result = availableDate.isBefore(today);

        assertThat(result).isEqualTo(expected);
    }
}
