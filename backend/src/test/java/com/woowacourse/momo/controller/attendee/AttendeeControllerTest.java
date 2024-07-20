package com.woowacourse.momo.controller.attendee;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.attendee.AttendeeService;
import com.woowacourse.momo.service.attendee.dto.AttendeeLoginRequest;
import com.woowacourse.momo.support.IsolateDatabase;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
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
    private AttendeeService attendeeService;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    private Meeting meeting;
    private String name;
    private String password;
    private String uuid;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        meeting = meetingRepository.save(MeetingFixture.COFFEE.create());

        name = "attendee";
        password = "momo";
        attendeeRepository.save(new Attendee(meeting, name, password, Role.GUEST));
    }

    @DisplayName("로그인에 성공하면 200 상태 코드와 토큰을 응답한다.")
    @Test
    void login() {
        AttendeeLoginRequest request = new AttendeeLoginRequest(name, password);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/login/{uuid}", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
