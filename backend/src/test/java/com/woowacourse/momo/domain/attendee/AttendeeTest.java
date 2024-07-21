package com.woowacourse.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeeTest {

    @DisplayName("참가자의 비밀번호가 일치하지 않으면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfPasswordDoesNotMatch() {
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee attendee = new Attendee(meeting, "jazz", "1111", Role.GUEST);
        AttendeePassword other = new AttendeePassword("1234");

        assertThatThrownBy(() -> attendee.verifyPassword(other))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.PASSWORD_MISMATCHED.message());
    }

    @DisplayName("참가자의 비밀번호가 일치하면 정상 기능한다.")
    @Test
    void doesNotThrowExceptionIfPasswordMatches() {
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee attendee = new Attendee(meeting, "jazz", "1111", Role.GUEST);
        AttendeePassword other = new AttendeePassword("1111");

        assertThatNoException()
                .isThrownBy(() -> attendee.verifyPassword(other));
    }
}
