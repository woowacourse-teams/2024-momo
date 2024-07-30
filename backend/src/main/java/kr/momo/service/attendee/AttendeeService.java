package kr.momo.service.attendee;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeePassword;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.attendee.dto.TokenResponse;
import kr.momo.service.auth.JwtManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final MeetingRepository meetingRepository;
    private final JwtManager jwtManager;

    @Transactional
    public TokenResponse login(String uuid, AttendeeLoginRequest request) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        AttendeeName name = new AttendeeName(request.name());
        AttendeePassword password = new AttendeePassword(request.password());

        return attendeeRepository.findByMeetingAndName(meeting, name)
                .map(attendee -> verifyPassword(attendee, password))
                .orElseGet(() -> signup(meeting, name, password));
    }

    private TokenResponse verifyPassword(Attendee attendee, AttendeePassword password) {
        attendee.verifyPassword(password);
        return new TokenResponse(jwtManager.generate(attendee.getId()));
    }

    private TokenResponse signup(Meeting meeting, AttendeeName name, AttendeePassword password) {
        Attendee attendee = new Attendee(meeting, name, password, Role.GUEST);
        attendeeRepository.save(attendee);
        return new TokenResponse(jwtManager.generate(attendee.getId()));
    }
}
