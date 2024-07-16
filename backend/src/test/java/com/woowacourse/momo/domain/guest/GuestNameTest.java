package com.woowacourse.momo.domain.guest;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GuestNameTest {

    @Test
    @DisplayName("게스트 이름이 20글자를 초과하면 예외를 발생시킨다.")
    void throwsExceptionIfGuestNameIsTooLong() {
        assertThatThrownBy(() -> new GuestName("woowacourse-momo-jjangjjanng-momo"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("게스트 이름 객체가 정상 생성된다.")
    void createGuestNameObjectSuccessfully() {
        assertThatNoException()
                .isThrownBy(() -> new GuestName("momo"));
    }
}
