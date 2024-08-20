package kr.momo.domain.schedule;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.AvailableDateFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@IsolateDatabase
class ScheduleRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    private Attendee attendee;
    private AvailableDate availableDate;

    @BeforeEach
    void setUp() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        availableDate = availableDateRepository.save(AvailableDateFixture.TODAY.create(meeting));
    }

    @DisplayName("참가자의 스케쥴을 한 번에 삭제한다.")
    @Test
    void batchInsertTest() {
        List<Schedule> schedules = List.of(
                new Schedule(attendee, availableDate, Timeslot.TIME_0000),
                new Schedule(attendee, availableDate, Timeslot.TIME_0130),
                new Schedule(attendee, availableDate, Timeslot.TIME_0230)
        );
        scheduleRepository.saveAll(schedules);

        scheduleRepository.deleteByAttendee(attendee);

        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM schedule", Integer.class);
        assertThat(count).isEqualTo(0);
    }
}
