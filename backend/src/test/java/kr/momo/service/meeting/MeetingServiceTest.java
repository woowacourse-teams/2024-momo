package kr.momo.service.meeting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDateRepository;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.domain.meeting.MeetingType;
import kr.momo.domain.meeting.UuidGenerator;
import kr.momo.domain.meeting.fake.FakeUuidGenerator;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.service.meeting.dto.EntryMeetingResponse;
import kr.momo.service.meeting.dto.MeetingCreateRequest;
import kr.momo.service.meeting.dto.MeetingResponse;
import kr.momo.service.meeting.dto.MeetingSharingResponse;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class MeetingServiceTest {

    @TestConfiguration
    static class TestConfig {

        @Bean
        public UuidGenerator uuidGenerator() {
            return new FakeUuidGenerator();
        }

        @Bean
        public Clock fixedClock() {
            return Clock.fixed(Instant.parse("2024-08-01T10:15:30Z"), ZoneId.of("Asia/Seoul"));
        }
    }

    @Autowired
    private Clock clock;

    @Autowired
    private UuidGenerator uuidGenerator;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingService meetingService;

    @DisplayName("UUID로 약속 정보를 조회한다.")
    @Test
    void findByUUID() {
        Meeting meeting = meetingRepository.save(MeetingFixture.MOVIE.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));
        List<AvailableDate> availableDates = List.of(
                availableDateRepository.save(new AvailableDate(LocalDate.now(), meeting)),
                availableDateRepository.save(new AvailableDate(LocalDate.now().plusDays(1), meeting))
        );

        MeetingResponse response = meetingService.findByUUID(meeting.getUuid());

        assertAll(
                () -> assertThat(response.firstTime()).isEqualTo(meeting.earliestTime().toString()),
                () -> assertThat(response.lastTime()).isEqualTo(meeting.lastTime().toString()),
                () -> assertThat(response.meetingName()).isEqualTo(meeting.getName()),
                () -> assertThat(response.isLocked()).isFalse(),
                () -> assertThat(response.availableDates()).hasSize(availableDates.size()),
                () -> assertThat(response.attendeeNames()).isEqualTo(List.of(attendee.name())),
                () -> assertThat(response.type()).isEqualTo(meeting.getType().name())
        );
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

    @DisplayName("UUID가 이미 존재하여 최대 생성 횟수를 초과하면 예외가 발생한다.")
    @Test
    void throwExceptionWhenUuidAlreadyExistsAfterMaxAttempts() {
        Meeting meeting = new Meeting("momo", uuidGenerator.generateUuid(8), LocalTime.MIDNIGHT, LocalTime.NOON);
        meetingRepository.save(meeting);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "name",
                "password",
                "meetingName",
                List.of(LocalDate.now().toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        assertThatThrownBy(() -> meetingService.create(request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.UUID_GENERATION_FAILURE.message());
    }

    @DisplayName("약속을 생성할 때 과거 날짜를 보내면 예외가 발생합니다.")
    @Test
    void throwExceptionWhenDatesHavePast() {
        //given
        LocalDate today = LocalDate.now(clock);
        LocalDate yesterday = today.minusDays(1);
        MeetingCreateRequest request = new MeetingCreateRequest(
                "momoHost",
                "momo",
                "momoMeeting",
                List.of(yesterday.toString(), today.toString()),
                "08:00",
                "22:00",
                MeetingType.DATETIME
        );

        //when //then
        assertThatThrownBy(() -> meetingService.create(request))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.PAST_NOT_PERMITTED.message());
    }

    @DisplayName("약속을 잠그면 잠금 상태가 변경된다.")
    @Test
    void lock() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        meetingService.lock(meeting.getUuid(), attendee.getId());
        Meeting changedMeeting = meetingRepository.findById(meeting.getId()).orElseThrow();

        assertThat(changedMeeting.isLocked()).isTrue();
    }

    @DisplayName("약속을 잠글 때 약속을 조회할 수 없다면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenNoMeeting() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String uuid = "";
        long id = attendee.getId();

        assertThatThrownBy(() -> meetingService.lock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.NOT_FOUND_MEETING.message());
    }

    @DisplayName("약속을 잠글 때 참가자가 존재하지 않다면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenNoAttendee() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        String uuid = meeting.getUuid();
        long id = 1L;

        assertThatThrownBy(() -> meetingService.lock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.NOT_FOUND_ATTENDEE.message());
    }

    @DisplayName("약속을 잠글 때 로그인된 참가자가 호스트가 아니면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenAttendeeGuest() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String uuid = meeting.getUuid();
        long id = attendee.getId();

        assertThatThrownBy(() -> meetingService.lock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.ACCESS_DENIED.message());
    }

    @DisplayName("약속 잠금을 해제하면 잠금 상태가 변경된다.")
    @Test
    void unlock() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.HOST_JAZZ.create(meeting));

        meetingService.unlock(meeting.getUuid(), attendee.getId());
        Meeting changedMeeting = meetingRepository.findById(meeting.getId()).orElseThrow();

        assertThat(changedMeeting.isLocked()).isFalse();
    }

    @DisplayName("약속 잠금을 해제할 때 약속을 조회할 수 없다면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenUnlockNoMeeting() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String uuid = "";
        long id = attendee.getId();

        assertThatThrownBy(() -> meetingService.unlock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.INVALID_UUID.message());
    }

    @DisplayName("약속 잠금을 해제할 때 참가자가 존재하지 않다면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenUnlockNoAttendee() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        String uuid = meeting.getUuid();
        long id = 1L;

        assertThatThrownBy(() -> meetingService.unlock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_ATTENDEE.message());
    }

    @DisplayName("약속 잠금을 해제할 때 로그인된 참가자가 호스트가 아니면 예외가 발생한다.")
    @Test
    void throwsExceptionWhenUnlockAttendeeGuest() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        Attendee attendee = attendeeRepository.save(AttendeeFixture.GUEST_PEDRO.create(meeting));
        String uuid = meeting.getUuid();
        long id = attendee.getId();

        assertThatThrownBy(() -> meetingService.unlock(uuid, id))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.ACCESS_DENIED.message());
    }

    @DisplayName("UUID로 약속 입장 정보를 조회한다.")
    @Test
    void findMeetingHome() {
        Meeting meeting = meetingRepository.save(MeetingFixture.GAME.create());
        String uuid = meeting.getUuid();

        EntryMeetingResponse result = meetingService.findMeetingHome(uuid);

        assertAll(
                () -> assertThat(result.meetingName()).isEqualTo(meeting.getName()),
                () -> assertThat(result.type()).isEqualTo(meeting.getType().name())
        );
    }

    @DisplayName("약속 입장 정보를 조회한다.")
    @Test
    void throwsExceptionWhenFindHomeNoMeeting() {
        String uuid = UUID.randomUUID().toString();

        assertThatThrownBy(() -> meetingService.findMeetingHome(uuid))
                .isInstanceOf(MomoException.class)
                .hasMessage(MeetingErrorCode.NOT_FOUND_MEETING.message());
    }
}
