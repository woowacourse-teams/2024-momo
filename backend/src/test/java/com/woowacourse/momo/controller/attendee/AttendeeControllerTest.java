package com.woowacourse.momo.controller.attendee;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
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
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @DisplayName("로그인에 성공하면 200 상태 코드와 토큰을 응답한다.")
    @Test
    void login() {
        Meeting meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
        Attendee attendee = AttendeeFixture.HOST_JAZZ.create(meeting);
        attendeeRepository.save(new Attendee(meeting, attendee.name(), attendee.password(), Role.GUEST));

        AttendeeLoginRequest request = new AttendeeLoginRequest(attendee.name(), attendee.password());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/meetings/{uuid}/login", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
