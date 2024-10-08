package kr.momo.fixture;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeePassword;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.meeting.Meeting;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public enum AttendeeFixture {

    HOST_JAZZ("jazz", "1234", Role.HOST),
    GUEST_DAON("daon", "4321", Role.GUEST),
    GUEST_BAKEY("bakey", "3422", Role.GUEST),
    GUEST_PEDRO("pedro", "4353", Role.GUEST),
    GUEST_MARK("mark", "1234", Role.GUEST);

    private static final PasswordEncoder ENCODER = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    private final String name;
    private final String password;
    private final Role role;

    AttendeeFixture(String name, String password, Role role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public Attendee create(Meeting meeting) {
        return new Attendee(meeting, new AttendeeName(name), new AttendeePassword(ENCODER.encode(password)), role);
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
