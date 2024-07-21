package com.woowacourse.momo.service.attendee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.auth.JwtManager;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.fixture.MeetingFixture;
import com.woowacourse.momo.service.attendee.dto.AttendeeLoginRequest;
import com.woowacourse.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@IsolateDatabase
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class AttendeeServiceTest {

    @Autowired
    private AttendeeService attendeeService;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private JwtManager jwtManager;

    private Meeting coffee;
    private String name;
    private String password;

    @BeforeEach
    void setUp() {
        coffee = meetingRepository.save(MeetingFixture.COFFEE.create());

        name = "attendee";
        password = "momo";
        attendeeRepository.save(new Attendee(coffee, name, password, Role.GUEST));
    }

    @DisplayName("로그인 시 올바르지 않은 uuid로 접근할 경우 예외를 발생시킨다.")
    @Test
    void loginThrowsExceptionForInvalidUuid() {
        String uuid = "momomo@uuid";
        AttendeeLoginRequest request = new AttendeeLoginRequest(name, password);

        assertThatThrownBy(() -> attendeeService.login(uuid, request))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.INVALID_UUID.message());
    }

    @DisplayName("로그인 시 동일한 이름이 저장되어있지 않으면 새로 참가자를 생성한다.")
    @Test
    void createsNewAttendeeIfNameIsNotAlreadyExists() {
        String newName = "harry";
        AttendeeLoginRequest request = new AttendeeLoginRequest(newName, password);

        long initialCount = attendeeRepository.count();
        attendeeService.login(coffee.getUuid(), request);
        long finalCount = attendeeRepository.count();

        assertThat(finalCount).isEqualTo(initialCount + 1);
    }

    @DisplayName("로그인 시 동일한 이름이 저장되어 있으면 새로 참가자를 생성하지 않는다.")
    @Test
    void doesNotCreateAttendeeIfNameAlreadyExists() {
        AttendeeLoginRequest request = new AttendeeLoginRequest(name, password);
        attendeeService.login(coffee.getUuid(), request);

        long initialCount = attendeeRepository.count();
        attendeeService.login(coffee.getUuid(), request);
        long finalCount = attendeeRepository.count();

        assertThat(finalCount).isEqualTo(initialCount);
    }
}
