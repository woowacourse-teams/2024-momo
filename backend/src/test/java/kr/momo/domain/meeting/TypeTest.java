package kr.momo.domain.meeting;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import kr.momo.exception.MomoException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TypeTest {

    @DisplayName("daysonly일 때 true를 반환한다.")
    @Test
    void isDaysOnly() {
        assertAll(
                () -> assertTrue(Type.DAYSONLY.isDaysOnly()),
                () -> assertFalse(Type.DATETIME.isDaysOnly())
        );
    }

    @DisplayName("문자열을 Type으로 반환한다.")
    @Test
    void from() {
        assertAll(
                () -> assertEquals(Type.DAYSONLY, Type.from("daysonly")),
                () -> assertEquals(Type.DATETIME, Type.from("datetime"))
        );
    }

    @DisplayName("문자열을 Type으로 변환할 때 널이거나 올바르지 않은 값이라면 예외를 던진다.")
    @Test
    void fromInvalid() {
        assertAll(
                () -> assertThrows(MomoException.class, () -> Type.from(null)),
                () -> assertThrows(MomoException.class, () -> Type.from("invalid"))
        );
    }
}
