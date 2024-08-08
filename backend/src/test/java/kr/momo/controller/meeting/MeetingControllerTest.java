package kr.momo.controller.meeting;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.ConfirmedMeetingRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.timeslot.Timeslot;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.ConfirmedMeetingFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.meeting.dto.MeetingConfirmRequest;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class MeetingControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ConfirmedMeetingRepository confirmedMeetingRepository;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("UUID로 약속 정보를 조회하는데 성공하면 200 상태 코드를 응답한다.")
    @Test
    void find() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        AvailableDate today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        List<String> dates = List.of(today.getDate().toString(), tomorrow.getDate().toString());
        List<String> attendeeNames = List.of(attendee.name());

        Response response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}", meeting.getUuid());

        String meetingName = response.jsonPath().getString("data.meetingName");
        String firstTime = response.jsonPath().getString("data.firstTime");
        String lastTime = response.jsonPath().getString("data.lastTime");
        List<String> availableDatesList = response.jsonPath().getList("data.availableDates", String.class);
        List<String> attendeeNamesList = response.jsonPath().getList("data.attendeeNames", String.class);

        assertSoftly(softAssertions -> {
            softAssertions.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softAssertions.assertThat(meetingName).isEqualTo(meeting.getName());
            softAssertions.assertThat(firstTime).isEqualTo(meeting.startTimeslotTime().toString());
            softAssertions.assertThat(lastTime).isEqualTo(meeting.endTimeslotTime().toString());
            softAssertions.assertThat(availableDatesList).containsExactlyElementsOf(dates);
            softAssertions.assertThat(attendeeNamesList).containsExactlyElementsOf(attendeeNames);
        });
    }

    @DisplayName("약속 공유 정보를 조회하면 200OK와 응답을 반환한다.")
    @Test
    void findMeetingSharing() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/sharing", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("약속 공유 정보 조회시 UUID가 유효하지 않으면 400 Bad Request를 반환한다.")
    @Test
    void findMeetingSharingFailedWithInvalidUUID() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/sharing", "1234")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("약속을 생성하면 201 상태코드를 반환한다.")
    @Test
    void create() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate dayAfterTomorrow = today.plusDays(2);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(tomorrow, dayAfterTomorrow),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, containsString("/meeting/"));
    }

    @DisplayName("약속을 생성할 때 중복되는 날짜로 요청하면 400을 반환한다.")
    @Test
    void createByDuplicatedName() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(tomorrow, tomorrow),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0)
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("약속을 잠그면 200 OK를 반환한다.")
    @Test
    void lock() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .when().patch("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("존재하지 않는 약속을 잠금 시도하면 404 Not Found를 반환한다.")
    @Test
    void lockWithInvalidUUID() {
        String invalidUUID = "INVALID_UUID";
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", invalidUUID)
                .when().patch("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @DisplayName("약속을 잠글 때 호스트 권한이 없다면 403을 반환한다.")
    @Test
    void lockWithNoPermission() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .when().patch("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("약속을 잠금을 해제하면 200 OK를 반환한다.")
    @Test
    void unlock() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .when().patch("/api/v1/meetings/{uuid}/unlock")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("존재하지 않는 약속을 잠금 해제 시도하면 400 Bad Request를 반환한다.")
    @Test
    void unlockWithInvalidUUID() {
        String invalidUUID = "INVALID_UUID";
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", invalidUUID)
                .when().patch("/api/v1/meetings/{uuid}/unlock")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("약속을 잠금을 해제할 때 호스트 권한이 없다면 403을 반환한다.")
    @Test
    void unlockWithNoPermission() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String token = getToken(attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .when().patch("/api/v1/meetings/{uuid}/unlock")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    private String getToken(Attendee attendee, Meeting meeting) {
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        return RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().cookie("ACCESS_TOKEN");
    }

    @DisplayName("주최자가 잠겨있는 약속 일정을 확정하면 201 상태 코드를 응답한다.")
    @Test
    void confirmSchedule() {
        Meeting meeting = createLockedMovieMeeting();
        Attendee host = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        String token = getToken(host, meeting);
        MeetingConfirmRequest request = getValidFindRequest(tomorrow);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .header("Location", "/api/v1/meetings/" + meeting.getUuid() + "/confirm");
    }

    private Meeting createLockedMovieMeeting() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        meeting.lock();
        return meetingRepository.save(meeting);
    }

    @DisplayName("주최자가 아닌 참가자가 약속 일정을 확정하면 403 상태 코드를 응답한다.")
    @Test
    void confirmScheduleNotHost() {
        Meeting meeting = createLockedMovieMeeting();
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        Attendee guest = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));
        String token = getToken(guest, meeting);
        MeetingConfirmRequest request = getValidFindRequest(tomorrow);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("주최자가 잠겨있지 않은 약속 일정을 확정하면 400 상태 코드를 응답한다.")
    @Test
    void confirmScheduleUnlock() {
        Meeting meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        Attendee host = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        String token = getToken(host, meeting);
        MeetingConfirmRequest request = getValidFindRequest(tomorrow);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("주최자가 잠겨있는 약속의 확정된 약속을 취소하면 확정된 약속이 삭제되고 잠김이 해제된다. 204 상태 코드를 응답 받는다.")
    @Test
    void cancelConfirmedMeeting() {
        Meeting meeting = createLockedMovieMeeting();
        Attendee host = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        confirmedMeetingRepository.save(ConfirmedMeetingFixture.MOVIE.create(meeting));
        String token = getToken(host, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().delete("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());

        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.NOT_FOUND.value());

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}")
                .then().log().all()
                .body("data.isLocked", equalTo(false))
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("주최자가 확정되지 않은 약속을 취소하면 204 상태 코드를 응답 받는다.")
    @Test
    void cancelConfirmedMeetingNonExist() {
        Meeting meeting = createLockedMovieMeeting();
        Attendee host = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        String token = getToken(host, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().delete("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @DisplayName("주최자가 아닌 참여자가 약속 확정 취소하면 403 상태 코드를 응답 받는다.")
    @Test
    void cancelConfirmedMeetingNotHost() {
        Meeting meeting = createLockedMovieMeeting();
        Attendee guest = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));
        confirmedMeetingRepository.save(ConfirmedMeetingFixture.MOVIE.create(meeting));
        String token = getToken(guest, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().delete("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("확정된 약속을 조회하면 200 상태 코드를 응답한다.")
    @Test
    void findConfirmedMeeting() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        confirmedMeetingRepository.save(ConfirmedMeetingFixture.MOVIE.create(meeting));

        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("확정되지않은 약속의 확정 일정을 조회하면 400 상태 코드를 응답한다.")
    @Test
    void findConfirmedMeetingNotConfirmed() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        meeting.lock();
        meeting = meetingRepository.save(meeting);

        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    private MeetingConfirmRequest getValidFindRequest(AvailableDate tomorrow) {
        return new MeetingConfirmRequest(
                tomorrow.getDate(), Timeslot.TIME_0000.getLocalTime(),
                tomorrow.getDate(), Timeslot.TIME_0600.getLocalTime()
        );
    }
}
