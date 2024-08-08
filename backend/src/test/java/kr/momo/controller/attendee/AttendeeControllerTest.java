package kr.momo.controller.attendee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItems;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.auth.JwtManager;
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
class AttendeeControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private JwtManager jwtManager;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("로그인에 성공하면 200 상태 코드를 응답한다.")
    @Test
    void login() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        Response response = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid());

        String token = response.cookie("ACCESS_TOKEN");
        String hostName = response.jsonPath().getString("data");

        assertAll(
                () -> assertThat(jwtManager.extract(token)).isEqualTo(attendee.getId()),
                () -> assertThat(hostName).isEqualTo(request.attendeeName())
        );
    }

    @DisplayName("미팅에 참여한 모든 참여자를 조회하고 200 OK 상태코드를 반환한다.")
    @Test
    void findInMeeting() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        Attendee jazz = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        Attendee pero = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        Attendee mark = attendeeRepository.save(AttendeeFixture.GUEST_MARK.create(meeting));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meetings/{uuid}/attendees", meeting.getUuid())
                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("data", hasItems(jazz.name(), pero.name(), mark.name()));
    }
}
