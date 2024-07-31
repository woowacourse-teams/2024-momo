package kr.momo.controller.meeting;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;

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
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
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
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(LocalDate.of(2024, 7, 24), LocalDate.of(2024, 7, 25)),
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
        LocalDate date = LocalDate.of(2024, 7, 24);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(date, date),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

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
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .header("Authorization", "Bearer " + token)
                .when().post("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("존재하지 않는 약속을 잠금 시도하면 404 Not Found를 반환한다.")
    @Test
    void lockWithInvalidUUID() {
        String invalidUUID = "INVALID_UUID";
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", invalidUUID)
                .header("Authorization", "Bearer " + token)
                .when().post("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @DisplayName("약속을 잠글 때 호스트 권한이 없다면 403을 반환한다.")
    @Test
    void lockWithNoPermission() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .header("Authorization", "Bearer " + token)
                .when().post("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    @DisplayName("약속을 중복으로 잠그면 400을 반환한다.")
    @Test
    void lockWithDuplicatedRequest() {
        Meeting meeting = meetingRepository.save(MeetingFixture.DINNER.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().jsonPath().getString("data.token");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .header("Authorization", "Bearer " + token)
                .when().post("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .header("Authorization", "Bearer " + token)
                .when().post("/api/v1/meetings/{uuid}/lock")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
