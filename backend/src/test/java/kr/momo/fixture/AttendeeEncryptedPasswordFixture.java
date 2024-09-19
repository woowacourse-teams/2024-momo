package kr.momo.fixture;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import kr.momo.domain.attendee.AttendeePassword;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AttendeeEncryptedPasswordFixture {

    private AttendeeEncryptedPasswordFixture() {
    }

    private static final PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public static AttendeePassword createAttendeePassword(String rawPassword) throws Exception {
        Constructor<AttendeePassword> passwordConstructor = AttendeePassword.class.getDeclaredConstructor();
        passwordConstructor.setAccessible(true);
        AttendeePassword attendeePassword = passwordConstructor.newInstance();
        Field passwordField = AttendeePassword.class.getDeclaredField("password");
        passwordField.setAccessible(true);
        passwordField.set(attendeePassword, passwordEncoder.encode(rawPassword));
        return attendeePassword;
    }
}
