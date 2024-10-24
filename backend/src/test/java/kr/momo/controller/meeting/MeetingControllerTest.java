package kr.momo.controller.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.ConfirmedMeetingRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.meeting.MeetingType;
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
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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
            softAssertions.assertThat(firstTime).isEqualTo(meeting.earliestTime().toString());
            softAssertions.assertThat(lastTime).isEqualTo(meeting.lastTime().toString());
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
        AttendeeFixture hostJazz = AttendeeFixture.HOST_JAZZ;
        MeetingCreateRequest request = new MeetingCreateRequest(
                hostJazz.getName(),
                hostJazz.getPassword(),
                "momoMeeting",
                List.of(tomorrow.toString(), dayAfterTomorrow.toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, containsString("/meeting/"));
    }

    @ParameterizedTest
    @CsvSource(value = {"8:00,22:00", "08:00,2:00", "00:00,24:00"})
    @DisplayName("유효하지 않은 시간형식을 요청하면 400 상태코드를 반환한다.")
    void throwExceptionTimeFormatIsInvalid(String startTime, String endTime) {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate dayAfterTomorrow = today.plusDays(2);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(tomorrow.toString(), dayAfterTomorrow.toString()),
                startTime,
                endTime,
                MeetingType.DATETIME
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("닉네임이 5자 초과면 400 상태 코드를 응답한다.")
    @Test
    void createByInvalidNickname() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate dayAfterTomorrow = today.plusDays(2);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "빙봉해리낙타",
                "1234",
                "momoMeeting",
                List.of(tomorrow.toString(), dayAfterTomorrow.toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("비밀번호가 10자 초과하면 400 상태 코드를 응답한다.")
    void createByInvalidHost() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        LocalDate dayAfterTomorrow = today.plusDays(2);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "빙봉해리낙",
                "12345hi234324",
                "momoMeeting",
                List.of(tomorrow.toString(), dayAfterTomorrow.toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
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
                List.of(tomorrow.toString(), tomorrow.toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("약속을 생성할 때 약속의 타입 없이 요청한다면 400을 반환한다.")
    @Test
    void createByInvalidType() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(tomorrow.toString(), tomorrow.toString()),
                "08:00",
                "22:00",
                null
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
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

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
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

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
        AttendeeFixture daon = AttendeeFixture.GUEST_DAON;
        Attendee attendee = attendeeRepository.save(daon.create(meeting));
        String token = getToken(daon.getPassword(), attendee, meeting);

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
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

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
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

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
        AttendeeFixture daon = AttendeeFixture.GUEST_DAON;
        Attendee attendee = attendeeRepository.save(daon.create(meeting));
        String token = getToken(daon.getPassword(), attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .contentType(ContentType.JSON)
                .pathParam("uuid", meeting.getUuid())
                .when().patch("/api/v1/meetings/{uuid}/unlock")
                .then().log().all()
                .statusCode(HttpStatus.FORBIDDEN.value());
    }

    private String getToken(String rawPassword, Attendee attendee, Meeting meeting) {
        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), rawPassword);

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
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);
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

    @DisplayName("주최자가 연속적인 약속 일정을 확정하면 201 상태 코드를 응답한다.")
    @Test
    void confirmConsecutiveMeeting() {
        Meeting meeting = MeetingFixture.DRINK.create();
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee host = attendeeRepository.save(jazz.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(2), meeting));
        AvailableDate plus3Days = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(3), meeting));
        String token = getToken(jazz.getPassword(), host, meeting);
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                tomorrow.getDate(),
                Timeslot.TIME_0000.startTime(),
                plus3Days.getDate(),
                Timeslot.TIME_2330.startTime()
        );

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

    @DisplayName("주최자가 유형이 DaysOnly이며 잠겨있는 약속 일정을 확정하면 201 상태 코드를 응답한다.")
    @Test
    void confirmConsecutiveAndDaysOnlyMeeting() {
        Meeting meeting = MeetingFixture.DRINK.create(MeetingType.DAYSONLY);
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee host = attendeeRepository.save(jazz.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(2), meeting));
        AvailableDate plus3Days = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(3), meeting));
        String token = getToken(jazz.getPassword(), host, meeting);
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                tomorrow.getDate(),
                Timeslot.TIME_0000.startTime(),
                plus3Days.getDate(),
                Timeslot.TIME_0000.startTime()
        );

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

    @DisplayName("주최자가 연속적이지 않은 약속 일정을 확정하면 400 상태 코드를 응답한다.")
    @Test
    void confirmNotConsecutiveMeeting() {
        Meeting meeting = MeetingFixture.DRINK.create();
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee host = attendeeRepository.save(jazz.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        AvailableDate plus3Days = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(3), meeting));
        String token = getToken(jazz.getPassword(), host, meeting);
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                tomorrow.getDate(),
                Timeslot.TIME_0000.startTime(),
                plus3Days.getDate(),
                Timeslot.TIME_0000.startTime()
        );

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("주최자가 유형이 DaysOnly이며 연속적이지 않은 약속 일정을 확정하면 400 상태 코드를 응답한다.")
    @Test
    void confirmNotConsecutiveAndDaysOnlyMeeting() {
        Meeting meeting = MeetingFixture.DRINK.create(MeetingType.DAYSONLY);
        meeting.lock();
        meeting = meetingRepository.save(meeting);
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee host = attendeeRepository.save(jazz.create(meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        AvailableDate plus3Days = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(3), meeting));
        String token = getToken(jazz.getPassword(), host, meeting);
        MeetingConfirmRequest request = new MeetingConfirmRequest(
                tomorrow.getDate(),
                Timeslot.TIME_0000.startTime(),
                plus3Days.getDate(),
                Timeslot.TIME_0000.startTime()
        );

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @DisplayName("주최자가 아닌 참가자가 약속 일정을 확정하면 403 상태 코드를 응답한다.")
    @Test
    void confirmScheduleNotHost() {
        Meeting meeting = createLockedMovieMeeting();
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        AttendeeFixture guestMark = AttendeeFixture.GUEST_MARK;
        Attendee guest = attendeeRepository.save(guestMark.create(meeting));
        String token = getToken(guestMark.getPassword(), guest, meeting);
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
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
        Attendee host = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), host, meeting);
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

    @DisplayName("날짜시간의 요청 형식이 맞지 않다면 응답코드 400을 반환한다.")
    @Test
    void confirmInvalidRequest() {
        Meeting meeting = createLockedMovieMeeting();
        AvailableDate availableDate = availableDateRepository.save(
                new AvailableDate(LocalDate.now().plusDays(1), meeting));
        String tomorrow = availableDate.getDate().format(DateTimeFormatter.ISO_DATE);
        AttendeeFixture guestMark = AttendeeFixture.GUEST_MARK;
        Attendee guest = attendeeRepository.save(guestMark.create(meeting));
        String token = getToken(guestMark.getPassword(), guest, meeting);

        MeetingConfirmRequest request = new MeetingConfirmRequest(tomorrow, "3:00", tomorrow, "03:00");

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
        confirmedMeetingRepository.save(ConfirmedMeetingFixture.MOVIE.create(meeting));
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

        RestAssured.given().log().all()
                .cookie("ACCESS_TOKEN", token)
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().delete("/api/v1/meetings/{uuid}/confirm")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());

        assertAll(
                () -> {
                    Meeting cancelConfirmMeeting = meetingRepository.findById(meeting.getId()).get();
                    assertThat(cancelConfirmMeeting.isLocked()).isFalse();
                },
                () -> assertThat(confirmedMeetingRepository.findByMeeting(meeting)).isNotPresent()
        );
    }

    @DisplayName("주최자가 확정되지 않은 약속을 취소하면 204 상태 코드를 응답 받는다.")
    @Test
    void cancelConfirmedMeetingNonExist() {
        Meeting meeting = createLockedMovieMeeting();
        AttendeeFixture jazz = AttendeeFixture.HOST_JAZZ;
        Attendee attendee = attendeeRepository.save(jazz.create(meeting));
        String token = getToken(jazz.getPassword(), attendee, meeting);

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
        confirmedMeetingRepository.save(ConfirmedMeetingFixture.MOVIE.create(meeting));
        AttendeeFixture guestMark = AttendeeFixture.GUEST_MARK;
        Attendee guest = attendeeRepository.save(guestMark.create(meeting));
        String token = getToken(guestMark.getPassword(), guest, meeting);

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
        attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
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
                tomorrow.getDate(),
                Timeslot.TIME_0000.startTime(),
                tomorrow.getDate(),
                Timeslot.TIME_0600.startTime()
        );
    }

    @DisplayName("약속 입장 정보를 조회하면 200 상태 코드를 응답한다.")
    @Test
    void findMeetingHome() {
        Meeting meeting = MeetingFixture.MOVIE.create();
        meeting = meetingRepository.save(meeting);

        RestAssured.given().log().all()
                .pathParam("uuid", meeting.getUuid())
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/home")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
