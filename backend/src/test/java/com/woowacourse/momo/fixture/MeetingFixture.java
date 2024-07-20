package com.woowacourse.momo.fixture;

import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.timeslot.Timeslot;

public enum MeetingFixture {

    MOVIE("영화", "movie", Timeslot.TIME_0000, Timeslot.TIME_0600),
    SPORTS("스포츠", "sports", Timeslot.TIME_0800, Timeslot.TIME_1200),
    DINNER("저녁식사", "dinner", Timeslot.TIME_1800, Timeslot.TIME_2200),
    COFFEE("커피", "coffee", Timeslot.TIME_1000, Timeslot.TIME_1400),
    GAME("게임", "game", Timeslot.TIME_1800, Timeslot.TIME_2330);

    private final String name;
    private final String uuid;
    private final Timeslot firstTimeslot;
    private final Timeslot lastTimeslot;

    MeetingFixture(String name, String uuid, Timeslot firstTimeslot, Timeslot lastTimeslot) {
        this.name = name;
        this.uuid = uuid;
        this.firstTimeslot = firstTimeslot;
        this.lastTimeslot = lastTimeslot;
    }

    public Meeting create() {
        return new Meeting(name, uuid, firstTimeslot, lastTimeslot);
    }
}
