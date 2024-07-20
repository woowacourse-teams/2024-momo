package com.woowacourse.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeePasswordTest {

    @DisplayName("참가자 비밀번호가 20글자를 초과하면 예외를 발생시킨다.")
    @Test
    void throwsExceptionIfAttendeePasswordIsTooLong() {
        assertThatThrownBy(() -> new AttendeePassword("woowacourse-momo-jjangjjanng-momo"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @DisplayName("참가자 비밀번호 객체가 정상 생성된다.")
    @Test
    void createAttendeePasswordObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new AttendeePassword("momo"));
    }
}