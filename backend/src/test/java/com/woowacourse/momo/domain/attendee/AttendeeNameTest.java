package com.woowacourse.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeeNameTest {

    @Test
    @DisplayName("참여자 이름이 20글자를 초과하면 예외를 발생시킨다.")
    void throwsExceptionIfAttendeeNameIsTooLong() {
        assertThatThrownBy(() -> new AttendeeName("woowacourse-momo-jjangjjanng-momo"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("참여자 이름 객체가 정상 생성된다.")
    void createAttendeeNameObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new AttendeeName("momo"));
    }
}
