package com.woowacourse.momo.controller.schedule;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.schedule.dto.DateTimesCreateRequest;
import com.woowacourse.momo.service.schedule.dto.ScheduleCreateRequest;
import com.woowacourse.momo.support.IsolateDatabase;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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

    @Autowired
    private ScheduleRepository scheduleRepository;

    private Meeting meeting;
    private Attendee attendee;
    private AvailableDate today;
    private AvailableDate tomorrow;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        attendee = attendeeRepository.save(new Attendee(meeting, "name", "password", Role.GUEST));
        today = availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting));
        tomorrow = availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting));
    }

    @DisplayName("참가자가 스케줄을 생성하는데 성공하면 200 상태 코드를 응답한다.")
    @Test
    void create() {
        List<LocalTime> times = List.of(Timeslot.TIME_0100.getLocalTime(), Timeslot.TIME_0130.getLocalTime());
        List<DateTimesCreateRequest> dateTimes = List.of(
                new DateTimesCreateRequest(today.getDate(), times),
                new DateTimesCreateRequest(tomorrow.getDate(), times)
        );

        ScheduleCreateRequest request = new ScheduleCreateRequest(attendee.name(), dateTimes);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/schedule/{uuid}", meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @DisplayName("약속 uuid와 참가자 이름으로 스케줄 조회를 요쳥하면 200 상태 코드를 응답한다.")
    @Test
    void findSchedulesOfAttendee() {
        List<Schedule> schedules = new ArrayList<>();
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0300));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0400));
        schedules.add(new Schedule(attendee, today, Timeslot.TIME_0500));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1600));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1700));
        schedules.add(new Schedule(attendee, tomorrow, Timeslot.TIME_1300));
        scheduleRepository.saveAll(schedules);

        RestAssured.given().log().all()
                .when().get("/api/v1/meeting/{uuid}/schedule?attendeeName=" + attendee.name(), meeting.getUuid())
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
