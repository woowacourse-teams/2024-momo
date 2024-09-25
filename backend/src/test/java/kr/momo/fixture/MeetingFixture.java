package kr.momo.fixture;

import java.time.LocalTime;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.Type;

public enum MeetingFixture {

    MOVIE("영화", "movie", LocalTime.of(0, 0), LocalTime.of(6, 0)),
    SPORTS("스포츠", "sports", LocalTime.of(8, 0), LocalTime.of(12, 0)),
    DINNER("저녁식사", "dinner", LocalTime.of(18, 0), LocalTime.of(22, 0)),
    COFFEE("커피", "coffee", LocalTime.of(10, 0), LocalTime.of(14, 0)),
    GAME("게임", "game", LocalTime.of(18, 0), LocalTime.of(23, 30)),
    DRINK("음주", "drink", LocalTime.of(0, 0), LocalTime.of(0, 0));

    private final String name;
    private final String uuid;
    private final LocalTime firstTime;
    private final LocalTime lastTime;

    MeetingFixture(String name, String uuid, LocalTime firstTime, LocalTime lastTime) {
        this.name = name;
        this.uuid = uuid;
        this.firstTime = firstTime;
        this.lastTime = lastTime;
    }

    public Meeting create() {
        return new Meeting(name, uuid, firstTime, lastTime);
    }

    public Meeting create(Type type) {
        return new Meeting(name, uuid, firstTime, lastTime, type);
    }
}
