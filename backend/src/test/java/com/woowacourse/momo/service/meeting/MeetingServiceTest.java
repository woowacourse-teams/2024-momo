package com.woowacourse.momo.service.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
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
import com.woowacourse.momo.exception.code.AvailableDateErrorCode;
import com.woowacourse.momo.exception.code.MeetingErrorCode;
import com.woowacourse.momo.fixture.AttendeeFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.meeting.dto.MeetingCreateRequest;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import com.woowacourse.momo.service.meeting.dto.MeetingSharingResponse;
import com.woowacourse.momo.support.IsolateDatabase;
import com.woowacourse.momo.support.IsolateDatabase;
import com.woowacourse.momo.support.IsolateDatabase;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.List;
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

    private Meeting meeting;
    private List<AvailableDate> availableDates;

    @BeforeEach
    void setup() {
        meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        availableDates = List.of(
                availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting)),
                availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting))
        );
    }

    @DisplayName("UUID로 약속 정보를 조회한다.")
    @Test
    void findByUUID() {
        String uuid = meeting.getUuid();

        MeetingResponse response = meetingService.findByUUID(uuid);

        SoftAssertions.assertSoftly(softAssertions -> {
            softAssertions.assertThat(response.firstTime()).isEqualTo(meeting.firstTimeslotTime());
            softAssertions.assertThat(response.lastTime()).isEqualTo(meeting.lastTimeslotTime());
            softAssertions.assertThat(response.meetingName()).isEqualTo(meeting.getName());
            softAssertions.assertThat(response.availableDates().size()).isEqualTo(availableDates.size());
        });
    }

    @DisplayName("약속 정보와 참가자 정보를 통해 약속을 등록한다.")
    @Test
    void create() {
        //given
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(LocalDate.of(2024, 7, 24), LocalDate.of(2024, 7, 25)),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        //when
        meetingService.create(request);

        //then
        List<Meeting> meetings = meetingRepository.findAll();
        List<Attendee> attendees = attendeeRepository.findAll();
        List<AvailableDate> availableDates = availableDateRepository.findAll();

        assertAll(
                () -> assertThat(meetings).hasSize(1),
                () -> assertThat(attendees).hasSize(1),
                () -> assertThat(availableDates).hasSize(2)
        );
    }

    @DisplayName("약속을 생성한 참가자의 역할은 호스트이다.")
    @Test
    void createdMeetingByHost() {
        //given
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(LocalDate.of(2024, 7, 24), LocalDate.of(2024, 7, 25)),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        //when
        meetingService.create(request);

        //then
        List<Meeting> meetings = meetingRepository.findAll();
        Attendee attendee = attendeeRepository.findByMeetingAndName(meetings.get(0), new AttendeeName("momoHost"))
                .orElseThrow();

        assertThat(attendee.getRole()).isEqualTo(Role.HOST);
    }

    @DisplayName("약속을 생성할 때 같은 약속일을 2번 이상 보내면 예외가 발생합니다.")
    @Test
    void throwExceptionWhenDuplicatedDates() {
        //given
        LocalDate date = LocalDate.of(2024, 7, 24);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(date, date),
                LocalTime.of(8, 0),
                LocalTime.of(22, 0));

        //when //then
        assertThatThrownBy(() -> meetingService.create(request))
                .isInstanceOf(MomoException.class)
                .hasMessage(AvailableDateErrorCode.DUPLICATED_DATE.message());
    }

    @DisplayName("생성 완료된 약속의 정보를 조회한다.")
    @Test
    void findMeetingSharing() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());

        MeetingSharingResponse result = meetingService.findMeetingSharing(meeting.getUuid());

        assertThat(result.uuid()).isEqualTo(meeting.getUuid());
    }

    @DisplayName("생성 완료된 약속의 정보를 조회시 uuid가 일치하지 않으면 예외가 발생한다.")
    @Test
    void doesNotFindMeetingSharingMeetingIfUUIDNotExist() {
        String invalidUUID = "1234";
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        assertThatThrownBy(() -> meetingService.findMeetingSharing(invalidUUID))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }
}
