package com.woowacourse.momo.domain.guest;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GuestName {

    private String name;

    public GuestName(String name) {
        validateNameLength(name);
        this.name = name;
    }

    private void validateNameLength(String name) {
        if (name.length() > 20) {
            throw new IllegalArgumentException("이름의 길이는 20글자까지 가능합니다.");
        }
    }
}
