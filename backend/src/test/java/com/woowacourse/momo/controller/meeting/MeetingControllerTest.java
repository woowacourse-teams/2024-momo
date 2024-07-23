package com.woowacourse.momo.controller.meeting;

import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
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

    @DisplayName("약속 완료 정보를 조회하면 200OK와 응답을 반환한다.")
    @Test
    void findCompleted() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/api/v1/meeting/{uuid}/result", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
