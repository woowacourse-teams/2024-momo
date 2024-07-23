package com.woowacourse.momo.fixture;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeePassword;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;

public enum AttendeeFixture {

    HOST_JAZZ("jazz", "hostPw!123", Role.HOST),
    GUEST_DAON("daon", "daonPw!123", Role.GUEST),
    GUEST_BAKEY("bakey", "bakeyPw!123", Role.GUEST),
    GUEST_PEDRO("pedro", "pedroPw!123", Role.GUEST);

    private final String name;
    private final String password;
    private final Role role;

    AttendeeFixture(String name, String password, Role role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public Attendee create(Meeting meeting) {
        return new Attendee(meeting, new AttendeeName(name), new AttendeePassword(password), role);
    }
}
