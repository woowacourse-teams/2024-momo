package kr.momo.domain.attendee;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Converter
@RequiredArgsConstructor
public class PasswordConverter implements AttributeConverter<String, String> {

    private final PasswordEncoder passwordEncoder;

    @Override
    public String convertToDatabaseColumn(String raw) {
        return passwordEncoder.encode(raw);
    }

    @Override
    public String convertToEntityAttribute(String encoded) {
        return encoded;
    }
}
