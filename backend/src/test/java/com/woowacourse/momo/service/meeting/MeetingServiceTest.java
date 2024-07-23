package com.woowacourse.momo.service.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.meeting.dto.MeetingCompletedResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.support.IsolateDatabase;
import java.time.LocalDate;
import java.util.UUID;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class MeetingServiceTest {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @DisplayName("UUID로 약속 정보를 조회한다.")
    @Test
    void findByUUID() {
        // given
        String uuid = UUID.randomUUID().toString();

        String meetingName = "주먹 대결";
        Meeting meeting = meetingRepository.save(
                new Meeting(
                        null,
                        meetingName,
                        uuid,
                        Timeslot.TIME_0000,
                        Timeslot.TIME_0400
                )
        );

        Attendee attendee = attendeeRepository.save(new Attendee(meeting, "페드로", "1234", Role.GUEST));

        for (int i = 0; i < 7; i++) {
            availableDateRepository.save(new AvailableDate(
                    null,
                    LocalDate.now().minusDays(i + 1),
                    meeting)
            );
        }

        AvailableDate availableDate = availableDateRepository.findAll().get(0);
        scheduleRepository.save(new Schedule(null, attendee, availableDate, Timeslot.TIME_0300, Timeslot.TIME_0300));
        scheduleRepository.save(new Schedule(null, attendee, availableDate, Timeslot.TIME_0100, Timeslot.TIME_0300));

        // when
        MeetingResponse result = meetingService.findByUUID(uuid);

        // then
        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(result.meetingName()).isEqualTo(meetingName);
        softAssertions.assertThat(result.availableDates().get(0)).isEqualTo(LocalDate.now().minusDays(1));
        softAssertions.assertAll();
    }

    @DisplayName("생성 완료된 약속의 정보를 조회한다.")
    @Test
    void findCreatedResult() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());

        MeetingCompletedResponse result = meetingService.findCreatedResult(meeting.getUuid());

        assertThat(result.uuid()).isEqualTo(meeting.getUuid());
    }

    @DisplayName("생성 완료된 약속의 정보를 조회시 uuid가 일치하지 않으면 예외가 발생한다.")
    @Test
    void doesNotFindCreatedResultMeetingIfUUIDNotExist() {
        String invalidUUID = "1234";
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        assertThatThrownBy(() -> meetingService.findCreatedResult(invalidUUID))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }
}
