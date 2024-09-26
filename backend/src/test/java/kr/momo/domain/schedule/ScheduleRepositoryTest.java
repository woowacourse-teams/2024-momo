package kr.momo.domain.schedule;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
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
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class ScheduleRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Attendee attendee;
    private AvailableDate availableDate;

    @BeforeEach
    void setUp() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting, passwordEncoder));
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
        assertThat(count).isZero();
    }

    @DisplayName("참여자들이 모두 참여할 수 있는 시간대를 일정 오름차순 정렬된 상태로 조회한다.")
    @Test
    void findAllDateAndTimeslotByEssentialAttendees() {
        // given
        LocalDate now = LocalDate.now();
        Meeting meeting = meetingRepository.save(MeetingFixture.DRINK.create());
        Attendee jazz = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting, passwordEncoder));
        Attendee pedro = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting, passwordEncoder));
        Attendee daon = attendeeRepository.save(AttendeeFixture.GUEST_DAON.create(meeting, passwordEncoder));
        Attendee bakey = attendeeRepository.save(AttendeeFixture.GUEST_BAKEY.create(meeting, passwordEncoder));
        Attendee mark = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting, passwordEncoder));

        AvailableDate today = availableDateRepository.save(new AvailableDate(now, meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(now.plusDays(1), meeting));

        // jazz: 오늘 0000 ~ 2330 / 내일 0000 ~ 2330
        saveAttendeeSchedule(jazz, today, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2330));
        saveAttendeeSchedule(jazz, tomorrow, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2330));
        // pedro: 오늘 0600 ~ 0900, 1200 ~ 2330 / 내일 1600 ~ 2200
        saveAttendeeSchedule(pedro, today, createTimeslotRange(Timeslot.TIME_0600, Timeslot.TIME_0900));
        saveAttendeeSchedule(pedro, today, createTimeslotRange(Timeslot.TIME_1200, Timeslot.TIME_2330));
        saveAttendeeSchedule(pedro, tomorrow, createTimeslotRange(Timeslot.TIME_1600, Timeslot.TIME_2200));
        // daon: 오늘 0000 ~ 2130 / 내일 0000 ~ 2130
        saveAttendeeSchedule(daon, today, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2130));
        saveAttendeeSchedule(daon, tomorrow, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2130));
        // bakey: 오늘 1100 ~ 1800 / 1900 ~ 2330 / 내일 0000 ~ 1930
        saveAttendeeSchedule(bakey, today, createTimeslotRange(Timeslot.TIME_1100, Timeslot.TIME_1800));
        saveAttendeeSchedule(bakey, today, createTimeslotRange(Timeslot.TIME_1900, Timeslot.TIME_2330));
        saveAttendeeSchedule(bakey, tomorrow, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_1930));
        // mark: 오늘 0900 ~ 1430 / 내일 0000 ~ 2030
        saveAttendeeSchedule(mark, today, createTimeslotRange(Timeslot.TIME_0900, Timeslot.TIME_1430));
        saveAttendeeSchedule(mark, tomorrow, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2030));
        // 전원 가능한 타임슬롯: 오늘 1200 ~ 1430 / 내일 1600 ~ 1930

        // when
        AttendeeGroup essentialGroup = new AttendeeGroup(List.of(jazz, pedro, daon, mark, bakey));
        List<DateAndTimeslot> result = scheduleRepository.findAllDateAndTimeslotByEssentialAttendees(
                essentialGroup.getAttendees()
        );

        // then
        List<Timeslot> expectedResultToday = createTimeslotRange(Timeslot.TIME_1200, Timeslot.TIME_1430);
        List<Timeslot> expectedResultTomorrow = createTimeslotRange(Timeslot.TIME_1600, Timeslot.TIME_1930);
        List<DateAndTimeslot> expected = new ArrayList<>();
        expectedResultToday.stream()
                .map(timeslot -> new DateAndTimeslot(today.getDate(), timeslot))
                .forEach(expected::add);
        expectedResultTomorrow.stream()
                .map(timeslot -> new DateAndTimeslot(tomorrow.getDate(), timeslot))
                .forEach(expected::add);

        assertThat(result).containsExactlyElementsOf(expected);
    }

    private void saveAttendeeSchedule(Attendee attendee, AvailableDate date, List<Timeslot> timeslots) {
        scheduleRepository.saveAll(createAttendeeSchedule(attendee, date, timeslots));
    }

    private List<Timeslot> createTimeslotRange(Timeslot startInclusive, Timeslot endInclusive) {
        return Arrays.stream(Timeslot.values())
                .sorted(Comparator.comparing(Timeslot::startTime))
                .dropWhile(timeslot -> timeslot.isBefore(startInclusive.startTime()))
                .takeWhile(timeslot -> !timeslot.isAfter(endInclusive.startTime()))
                .toList();
    }

    private List<Schedule> createAttendeeSchedule(Attendee attendee, AvailableDate date, List<Timeslot> timeslots) {
        return timeslots.stream()
                .map(timeslot -> new Schedule(attendee, date, timeslot))
                .toList();
    }
}
