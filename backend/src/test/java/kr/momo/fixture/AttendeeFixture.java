package kr.momo.fixture;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeePassword;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.meeting.Meeting;

public enum AttendeeFixture {

    HOST_JAZZ("jazz", "hostPw!12", Role.HOST),
    GUEST_DAON("daon", "daonPw!12", Role.GUEST),
    GUEST_BAKEY("bakey", "bakeyPw!12", Role.GUEST),
    GUEST_PEDRO("pedro", "pedroPw!12", Role.GUEST),
    GUEST_MARK("mark", "mark!12", Role.GUEST);

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
