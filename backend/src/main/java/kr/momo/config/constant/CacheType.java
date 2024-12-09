package kr.momo.config.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CacheType {

    SCHEDULES_STORE("schedules-store"),
    RECOMMEND_STORE("recommend-store");

    private final String name;
}
