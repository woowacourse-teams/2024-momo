package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class RoleTest {

    @ParameterizedTest
    @CsvSource(value = {"HOST,true", "GUEST,false"})
    void isHost(Role given, boolean expected) {
        boolean result = given.isHost();

        assertThat(result).isEqualTo(expected);
    }
}
