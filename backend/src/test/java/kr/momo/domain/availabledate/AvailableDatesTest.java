package kr.momo.domain.availabledate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.List;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AvailableDateErrorCode;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class AvailableDatesTest {

    @DisplayName("주어진 날짜와 일치하는 가능 날짜를 찾고, 없으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfDateNotFound() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        AvailableDates availableDates = new AvailableDates(List.of(
                new AvailableDate(today, MeetingFixture.GAME.create()),
                new AvailableDate(tomorrow, MeetingFixture.GAME.create())
        ));

        LocalDate other = tomorrow.plusDays(1);

        assertThatThrownBy(() -> availableDates.findByDate(other))
                .isInstanceOf(MomoException.class)
                .hasMessage(AvailableDateErrorCode.INVALID_AVAILABLE_DATE.message());
    }

    @DisplayName("주어진 날짜와 일치하는 가능 날짜를 찾고, 존재하면 가능 날짜 객체를 반환한다.")
    @Test
    void successfulWhenDateIsFound() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        AvailableDates availableDates = new AvailableDates(List.of(
                new AvailableDate(today, MeetingFixture.GAME.create()),
                new AvailableDate(tomorrow, MeetingFixture.GAME.create())
        ));

        AvailableDate availableDate = availableDates.findByDate(tomorrow);

        assertThat(availableDate.getDate()).isEqualTo(tomorrow);
    }

    @DisplayName("가능한 시간의 값이 중복이면 예외가 발생한다.")
    @Test
    void throwExceptionWhenDuplicatedDate() {
        // given
        Meeting meeting = MeetingFixture.GAME.create();
        LocalDate date = LocalDate.of(2024, 7, 24);
        List<LocalDate> dates = List.of(date, date);

        // when then
        assertThatThrownBy(() -> new AvailableDates(dates, meeting))
                .isInstanceOf(MomoException.class)
                .hasMessage(AvailableDateErrorCode.DUPLICATED_DATE.message());
    }

    @DisplayName("가능한 시간이 중복이 아니면 예외가 발생하지 않는다.")
    @Test
    void createAvailableDates() {
        // given
        Meeting meeting = MeetingFixture.GAME.create();
        LocalDate date1 = LocalDate.of(2024, 7, 24);
        LocalDate date2 = LocalDate.of(2024, 8, 25);
        List<LocalDate> dates = List.of(date1, date2);

        // when then
        assertThatCode(() -> new AvailableDates(dates, meeting))
                .doesNotThrowAnyException();
    }

    @DisplayName("가능한 시간 목록 중 하나라도 비교군보다 이전 시간인지 판단한다.")
    @ParameterizedTest
    @CsvSource(value = {"-3,-2,-1,true", "-2,-1,0,true", "-1,0,1,true", "0,1,2,false", "1,2,3,false"})
    void isAnyBefore(int plusDays1, int plusDays2, int plusDays3, boolean expected) {
        LocalDate today = LocalDate.now();
        LocalDate firstDay = today.plusDays(plusDays1);
        LocalDate secondDay = today.plusDays(plusDays2);
        LocalDate thirdDay = today.plusDays(plusDays3);
        Meeting meeting = MeetingFixture.GAME.create();
        AvailableDates availableDates = new AvailableDates(List.of(
                new AvailableDate(firstDay, meeting),
                new AvailableDate(secondDay, meeting),
                new AvailableDate(thirdDay, meeting)
        ));

        boolean result = availableDates.isAnyBefore(today);

        assertThat(result).isEqualTo(expected);
    }
}
