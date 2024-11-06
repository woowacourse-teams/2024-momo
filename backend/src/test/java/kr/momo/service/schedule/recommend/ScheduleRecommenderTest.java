package kr.momo.service.schedule.recommend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.LocalDate;
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
import kr.momo.domain.meeting.MeetingType;
import kr.momo.domain.schedule.DateTimeInterval;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.schedule.recommend.CandidateSchedule;
import kr.momo.domain.schedule.recommend.RecommendedScheduleSortStandard;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.transaction.annotation.Transactional;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class ScheduleRecommenderTest {

    private static final int DEFAULT_MIN_SIZE = 0;

    @Autowired
    private TotalScheduleRecommender totalScheduleRecommender;

    @Autowired
    private FilteredScheduleRecommender filteredScheduleRecommender;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    private final LocalDate today = LocalDate.now();
    private final LocalDate tomorrow = today.plusDays(1);
    private Attendee jazz;
    private Attendee pedro;
    private Attendee daon;
    private Attendee bakey;
    private Attendee mark;

    @BeforeEach
    void setUp() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DRINK.create());
        jazz = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        pedro = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        daon = attendeeRepository.save(AttendeeFixture.GUEST_DAON.create(meeting));
        bakey = attendeeRepository.save(AttendeeFixture.GUEST_BAKEY.create(meeting));
        mark = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));

        AvailableDate todayAvailableDate = availableDateRepository.save(new AvailableDate(today, meeting));
        AvailableDate tomorrowAvailableDate = availableDateRepository.save(
                new AvailableDate(today.plusDays(1), meeting)
        );

        // jazz: 오늘 0000 ~ 2330 / 내일 0000 ~ 2330
        saveAttendeeSchedule(jazz, todayAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2330));
        saveAttendeeSchedule(jazz, tomorrowAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2330));
        // pedro: 오늘 0600 ~ 0900, 1200 ~ 2330 / 내일 1600 ~ 2200
        saveAttendeeSchedule(pedro, todayAvailableDate, createTimeslotRange(Timeslot.TIME_0600, Timeslot.TIME_0900));
        saveAttendeeSchedule(pedro, todayAvailableDate, createTimeslotRange(Timeslot.TIME_1200, Timeslot.TIME_2330));
        saveAttendeeSchedule(pedro, tomorrowAvailableDate, createTimeslotRange(Timeslot.TIME_1600, Timeslot.TIME_2200));
        // daon: 오늘 0000 ~ 2130 / 내일 0000 ~ 2130
        saveAttendeeSchedule(daon, todayAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2130));
        saveAttendeeSchedule(daon, tomorrowAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2130));
        // bakey: 오늘 1100 ~ 1800 / 1900 ~ 2330 / 내일 0000 ~ 1930
        saveAttendeeSchedule(bakey, todayAvailableDate, createTimeslotRange(Timeslot.TIME_1100, Timeslot.TIME_1800));
        saveAttendeeSchedule(bakey, todayAvailableDate, createTimeslotRange(Timeslot.TIME_1900, Timeslot.TIME_2330));
        saveAttendeeSchedule(bakey, tomorrowAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_1930));
        // mark: 오늘 0900 ~ 1430 / 내일 0000 ~ 2030
        saveAttendeeSchedule(mark, todayAvailableDate, createTimeslotRange(Timeslot.TIME_0900, Timeslot.TIME_1430));
        saveAttendeeSchedule(mark, tomorrowAvailableDate, createTimeslotRange(Timeslot.TIME_0000, Timeslot.TIME_2030));
        // 전원 가능한 타임슬롯: 오늘 1200 ~ 1430 / 내일 1600 ~ 1930
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

    private DateTimeInterval createDateTimeInterval(
            LocalDate startDate, int startHour, int startMinute,
            LocalDate endDate, int endHour, int endMinute
    ) {
        return new DateTimeInterval(startDate.atTime(startHour, startMinute), endDate.atTime(endHour, endMinute));
    }

    private AttendeeGroup createAttendeeGroup(Attendee... attendees) {
        return new AttendeeGroup(List.of(attendees));
    }

    @DisplayName("모든 참여자에 대한 스케줄을 추천한다.")
    @Nested
    @Transactional  // TODO: 테스트 코드에서의 @Transactional 사용 논의 필요
    class TotalScheduleRecommenderTest {

        @DisplayName("참여자의 부분 집합 별 참여 가능 시간을 구한 뒤, "
                + "(참여자 많은 순, 빠른 시간 순)으로 정렬하고 상위 10개를 추천한다.")
        @Test
        void recommendByEachAttendeeSubsetOrderByAttendeeCountAndEarliestTime() {
            // given
            AttendeeGroup group = new AttendeeGroup(List.of(jazz, pedro, daon, bakey, mark));
            List<CandidateSchedule> expected = List.of(
                    new CandidateSchedule(
                            createDateTimeInterval(today, 12, 0, today, 15, 0),
                            createAttendeeGroup(jazz, pedro, daon, mark, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 16, 0, tomorrow, 20, 0),
                            createAttendeeGroup(jazz, pedro, daon, mark, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 9, 0, today, 9, 30),
                            createAttendeeGroup(jazz, pedro, daon, mark)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 11, 0, today, 12, 0),
                            createAttendeeGroup(jazz, daon, bakey, mark)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 15, 0, today, 18, 30),
                            createAttendeeGroup(jazz, pedro, daon, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 19, 0, today, 22, 0),
                            createAttendeeGroup(jazz, pedro, daon, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 0, 0, tomorrow, 16, 0),
                            createAttendeeGroup(jazz, daon, bakey, mark)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 20, 0, tomorrow, 21, 0),
                            createAttendeeGroup(jazz, pedro, daon, mark)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 6, 0, today, 9, 0),
                            createAttendeeGroup(jazz, pedro, daon)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 9, 30, today, 11, 0),
                            createAttendeeGroup(jazz, daon, mark)
                    )
            );

            // when
            List<CandidateSchedule> recommendResult = totalScheduleRecommender.recommend(
                    group,
                    RecommendedScheduleSortStandard.EARLIEST_ORDER.getType(),
                    MeetingType.DATETIME,
                    DEFAULT_MIN_SIZE
            );

            // then
            assertAll(
                    () -> assertThat(recommendResult).hasSizeLessThanOrEqualTo(10),
                    () -> assertThat(recommendResult).containsExactlyElementsOf(expected)
            );
        }

        @DisplayName("참여자의 부분 집합 별 참여 가능 시간을 구한 뒤, "
                + "(참여자 많은 순, 빠른 시간 순)으로 정렬하고 상위 10개를 추천한다."
                + "최소 시간 보장을 곁들인")
        @Test
        void recommendByEachAttendeeSubsetOrderByAttendeeCountAndEarliestTimeWithMinimumTime() {
            // given
            int givenMinTime = 3;
            AttendeeGroup group = new AttendeeGroup(List.of(jazz, pedro, daon, bakey, mark));
            List<CandidateSchedule> expected = List.of(
                    new CandidateSchedule(
                            createDateTimeInterval(today, 12, 0, today, 15, 0),
                            createAttendeeGroup(jazz, pedro, daon, mark, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 16, 0, tomorrow, 20, 0),
                            createAttendeeGroup(jazz, pedro, daon, mark, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 15, 0, today, 18, 30),
                            createAttendeeGroup(jazz, pedro, daon, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 19, 0, today, 22, 0),
                            createAttendeeGroup(jazz, pedro, daon, bakey)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 0, 0, tomorrow, 16, 0),
                            createAttendeeGroup(jazz, daon, bakey, mark)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 6, 0, today, 9, 0),
                            createAttendeeGroup(jazz, pedro, daon)
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 0, 0, today, 6, 0),
                            createAttendeeGroup(jazz, daon)
                    )
            );

            // when
            List<CandidateSchedule> recommendResult = totalScheduleRecommender.recommend(
                    group, RecommendedScheduleSortStandard.EARLIEST_ORDER.getType(), MeetingType.DATETIME, givenMinTime
            );

            // then
            assertAll(
                    () -> assertThat(recommendResult).hasSizeLessThanOrEqualTo(10),
                    () -> assertThat(recommendResult).containsExactlyElementsOf(expected)
            );
        }
    }

    @DisplayName("필터링 된 참여자에 대한 스케줄을 추천한다.")
    @Nested
    class FilteredScheduleRecommenderTest {

        @DisplayName("필터링된 참여자 모두가 참여 가능한 시간을 구한 뒤, 빠른 시간 순으로 정렬하고 상위 5개를 추천한다.")
        @Test
        void recommendByFilteredAttendeeOrderByAttendeeCountAndEarliestTime() {
            // given
            AttendeeGroup filteredGroup = new AttendeeGroup(List.of(jazz, pedro, mark));

            // when
            List<CandidateSchedule> recommendResult = filteredScheduleRecommender.recommend(
                    filteredGroup,
                    RecommendedScheduleSortStandard.EARLIEST_ORDER.getType(),
                    MeetingType.DATETIME,
                    DEFAULT_MIN_SIZE
            );

            // then
            AttendeeGroup expectedGroup = createAttendeeGroup(jazz, pedro, mark);
            List<CandidateSchedule> expected = List.of(
                    new CandidateSchedule(
                            createDateTimeInterval(today, 9, 0, today, 9, 30),
                            expectedGroup
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(today, 12, 0, today, 15, 0),
                            expectedGroup
                    ),
                    new CandidateSchedule(
                            createDateTimeInterval(tomorrow, 16, 0, tomorrow, 21, 0),
                            expectedGroup
                    )
            );

            assertAll(
                    () -> assertThat(recommendResult).hasSizeLessThanOrEqualTo(5),
                    () -> assertThat(recommendResult).containsExactlyElementsOf(expected)
            );
        }
    }
}
