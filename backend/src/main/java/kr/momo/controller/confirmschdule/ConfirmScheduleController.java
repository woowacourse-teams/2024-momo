package kr.momo.controller.confirmschdule;

import jakarta.validation.Valid;
import java.net.URI;
import kr.momo.controller.auth.AuthAttendee;
import kr.momo.service.confirmschedule.ConfirmScheduleService;
import kr.momo.service.schedule.dto.ScheduleConfirmRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConfirmScheduleController {

    private final ConfirmScheduleService confirmScheduleService;

    @PostMapping("/api/v1/meetings/{uuid}/confirmed-schedule")
    public ResponseEntity<Void> confirmSchedule(
            @PathVariable String uuid, @AuthAttendee long id, @RequestBody @Valid ScheduleConfirmRequest request
    ) {
        confirmScheduleService.create(uuid, id, request);
        return ResponseEntity.created(URI.create("/api/v1/meetings/" + uuid + "/confirmed-schedule")).build();
    }
}
