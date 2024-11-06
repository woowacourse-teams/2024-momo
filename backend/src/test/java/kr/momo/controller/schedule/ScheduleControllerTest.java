package kr.momo.controller.schedule;

import static kr.momo.domain.schedule.recommend.RecommendedScheduleSortStandard.EARLIEST_ORDER;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.schedule.dto.DateTimesCreateRequest;
import kr.momo.service.schedule.dto.ScheduleCreateRequest;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ScheduleControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Meeting meeting;
    private AttendeeFixture fixture;
    private Attendee attendee;
    private AvailableDate today;
    private AvailableDate tomorrow;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        fixture = AttendeeFixture.GUEST_DAON;
        meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        attendee = attendeeRepository.save(fixture.create(meeting));
        today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
    }

    @DisplayName("참가자가 스케줄을 생성하는데 성공하면 200 상태 코드를 응답한다.")
    @Test
    void create() {
        AttendeeLoginRequest loginRequest = new AttendeeLoginRequest(attendee.name(), fixture.getPassword());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().cookie("ACCESS_TOKEN");

        List<LocalTime> times = List.of(Timeslot.TIME_0100.startTime(), Timeslot.TIME_0130.startTime());
        List<DateTimesCreateRequest> dateTimes = List.of(
                new DateTimesCreateRequest(today.getDate(), times),
                new DateTimesCreateRequest(tomorrow.getDate(), times)
        );

        ScheduleCreateRequest scheduleCreateRequest = new ScheduleCreateRequest(dateTimes);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(scheduleCreateRequest)
                .when().post("/api/v1/meetings/{uuid}/schedules")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("약속 uuid와 참가자 이름으로 스케줄 조회를 요쳥하면 200 상태 코드를 응답한다.")
    @Test
    void findSchedulesOfAttendee() {
        createAttendeeSchedule(attendee);

        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .queryParam("attendeeName", attendee.name())
                .when().get("/api/v1/meetings/{uuid}/schedules")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("전체 스케줄을 조회하는데 성공하면 200 상태 코드를 응답한다.")
    @Test
    void findAllSchedules() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/schedules", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("UUID와 참가자 ID로 자신의 스케줄을 조회한다.")
    @Test
    void findMySchedule() {
        AttendeeLoginRequest loginRequest = new AttendeeLoginRequest(attendee.name(), fixture.getPassword());

        createAttendeeSchedule(attendee);

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().cookie("ACCESS_TOKEN");

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/attendees/me/schedules")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("추천 타입과 참가자에 맞춰 추천 약속을 조회한다.")
    @Test
    void recommendSchedules() {
        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .queryParam("recommendType", EARLIEST_ORDER.getType())
                .queryParams("attendeeNames", List.of(attendee.name()))
                .queryParam("minTime", 0)
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/recommended-schedules")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("추천 약속을 조회시 최소 시간을 입력받지 않아도 동작한다.")
    @Test
    void recommendSchedulesWithoutMinTime() {
        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .queryParam("recommendType", EARLIEST_ORDER.getType())
                .queryParams("attendeeNames", List.of(attendee.name()))
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/recommended-schedules")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("추천 약속 조회시 최소 시간이 0보다 작으면 예외가 발생한다.")
    @Test
    void recommendSchedulesIfSmallerThanZero() {
        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .queryParam("recommendType", EARLIEST_ORDER.getType())
                .queryParams("attendeeNames", List.of(attendee.name()))
                .queryParam("minTime", -1)
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/recommended-schedules")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    private void createAttendeeSchedule(Attendee attendee) {
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0300));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0400));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0500));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1600));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1700));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1300));
        scheduleRepository.saveAll(schedules);
    }
}
