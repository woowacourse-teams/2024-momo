package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class RoleTest {

    @ParameterizedTest
    @CsvSource(value = {"HOST,false", "GUEST,true"})
    void isHost(Role given, boolean expected) {
        boolean result = given.isNotHost();

        assertThat(result).isEqualTo(expected);
    }
}
