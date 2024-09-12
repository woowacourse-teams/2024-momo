package kr.momo.domain.attendee;

import java.lang.reflect.Field;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AttendeeEncryptedPasswordFixture {

    private AttendeeEncryptedPasswordFixture() {
    }

    private static final PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public static AttendeePassword createAttendeePassword(String rawPassword) throws Exception {
        AttendeePassword attendeePassword = AttendeePassword.class.getDeclaredConstructor().newInstance();

        Field passwordField = AttendeePassword.class.getDeclaredField("password");
        passwordField.setAccessible(true);
        passwordField.set(attendeePassword, passwordEncoder.encode(rawPassword));
        return attendeePassword;
    }
}
