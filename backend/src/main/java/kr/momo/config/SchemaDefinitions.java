package kr.momo.config;

import io.swagger.v3.oas.models.media.ArraySchema;
import io.swagger.v3.oas.models.media.Schema;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import kr.momo.service.meeting.dto.MeetingConfirmResponse;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@Component
@SuppressWarnings("rawtypes")
public class SchemaDefinitions {

    private final Map<String, Schema> schemas;

    public SchemaDefinitions() {
        schemas = new HashMap<>();
        initSchemas();
    }

    private void initSchemas() {
        schemas.put("availableMeetingDates", createAvailableMeetingDates());
        schemas.put("localDateTime", createLocalDateTime());
    }

    private Schema createAvailableMeetingDates() {
        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        return new ArraySchema()
                .items(new Schema<String>().type("string"))
                .example(List.of(today.toString(), tomorrow.toString()));
    }

    private Schema createLocalDateTime() {
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = LocalDateTime.now().plusHours(4);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return new Schema<MeetingConfirmResponse>()
                .addProperty("startDateTime", new Schema<>().type("string").example(startTime.format(formatter)))
                .addProperty("endDateTime", new Schema<>().type("string").example(endTime.format(formatter)));
    }
}
