package com.woowacourse.momo.controller.meeting;

import static org.hamcrest.Matchers.containsString;

import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.support.IsolateDatabase;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
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
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    private Meeting meeting;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
    }

    @DisplayName("약속 공유 정보를 조회하면 200OK와 응답을 반환한다.")
    @Test
    void findMeetingSharing() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meeting/{uuid}/sharing", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("약속 공유 정보 조회시 UUID가 유효하지 않으면 400 Bad Request를 반환한다.")
    @Test
    void findMeetingSharingFailedWithInvalidUUID() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meeting/{uuid}/sharing", "1234")
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
                8,
                List.of(LocalDate.of(2024, 7, 24), LocalDate.of(2024, 7, 25)),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meeting")
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
                8,
                List.of(date, date),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meeting")
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }
}
