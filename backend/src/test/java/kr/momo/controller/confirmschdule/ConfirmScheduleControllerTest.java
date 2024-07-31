package kr.momo.controller.confirmschdule;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.schedule.Schedule;
import kr.momo.domain.schedule.ScheduleRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.schedule.dto.ScheduleConfirmRequest;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ConfirmScheduleControllerTest {

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

    private AvailableDate tomorrow;
    private Meeting meeting;
    Attendee host;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        meeting = MeetingFixture.MOVIE.create();
        meeting = meetingRepository.save(meeting);
        tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        host = attendeeRepository.save(new Attendee(meeting, "host", "password", Role.HOST));
        createAttendeeSchedule(host);
    }

    private void createAttendeeSchedule(Attendee attendee) {
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_0300));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_0330));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_0400));
        scheduleRepository.saveAll(schedules);
    }
    
    @DisplayName("주최자가 잠겨있는 약속 일정을 확정하면 201 상태 코드를 응답한다.")
    @Test
    void confirmSchedule() {
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        AttendeeLoginRequest loginRequest = new AttendeeLoginRequest(host.name(), host.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        ScheduleConfirmRequest request = new ScheduleConfirmRequest(
                tomorrow.getDate(), Timeslot.TIME_0300.getLocalTime(), Timeslot.TIME_0330.getLocalTime());

        RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirmed-schedule")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .header("Location", "/api/v1/meetings/" + meeting.getUuid() + "/confirmed-schedule");
    }
    
    @DisplayName("주최자가 아닌 참가자가 약속 일정을 확정하면 403 상태 코드를 응답한다.")
    @Test
    void confirmScheduleNotHost() {
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        Attendee guest = attendeeRepository.save(new Attendee(meeting, "guest", "password", Role.GUEST));

        AttendeeLoginRequest loginRequest = new AttendeeLoginRequest(guest.name(), guest.password());
        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        ScheduleConfirmRequest request = new ScheduleConfirmRequest(
                tomorrow.getDate(), Timeslot.TIME_0300.getLocalTime(), Timeslot.TIME_0330.getLocalTime());

        RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirmed-schedule")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("주최자가 잠겨있지 않은 약속 일정을 확정하면 400 상태 코드를 응답한다.")
    @Test
    void confirmScheduleUnlock() {
        AttendeeLoginRequest loginRequest = new AttendeeLoginRequest(host.name(), host.password());
        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        ScheduleConfirmRequest request = new ScheduleConfirmRequest(
                tomorrow.getDate(), Timeslot.TIME_0300.getLocalTime(), Timeslot.TIME_0330.getLocalTime());

        RestAssured.given().log().all()
                .header("Authorization", "Bearer " + token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirmed-schedule")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
