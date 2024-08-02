package kr.momo.controller.attendee;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
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

    @DisplayName("로그인에 성공하면 200 상태 코드와 토큰을 응답한다.")
    @Test
    void login() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        String token = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().cookie("ACCESS_TOKEN");

        assertThat(jwtManager.extract(token)).isEqualTo(attendee.getId());
    }
}
