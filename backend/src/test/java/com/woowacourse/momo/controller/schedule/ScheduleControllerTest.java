package com.woowacourse.momo.controller.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.schedule.dto.DateTimesCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ScheduleControllerTest {

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

    @DisplayName("참가자가 스케줄을 생성하는데 성공하면 200 상태 코드를 응답한다.")
    @Test
    void create() {
        Meeting meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        Attendee attendee = attendeeRepository.save(new Attendee(meeting, "name", "password", Role.GUEST));
        AvailableDate today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        AvailableDate tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));

        List<LocalTime> times = List.of(Timeslot.TIME_0100.getLocalTime(), Timeslot.TIME_0130.getLocalTime());
        List<DateTimesCreateRequest> dateWithTimes = List.of(
                new DateTimesCreateRequest(today.getDate(), times),
                new DateTimesCreateRequest(tomorrow.getDate(), times)
        );

        ScheduleCreateRequest request = new ScheduleCreateRequest(attendee.name(), dateWithTimes);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/schedule/{uuid}", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
