package kr.momo.fixture;

import java.time.LocalDate;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.meeting.Meeting;

public enum AvailableDateFixture {
    TODAY(LocalDate.now()),
    TOMORROW(LocalDate.now().plusDays(1));

    private final LocalDate date;

    AvailableDateFixture(LocalDate date) {
        this.date = date;
    }

    public AvailableDate create(Meeting meeting) {
        return new AvailableDate(date, meeting);
    }
}
