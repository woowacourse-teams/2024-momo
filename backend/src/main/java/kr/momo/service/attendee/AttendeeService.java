package kr.momo.service.attendee;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeName;
import kr.momo.domain.attendee.AttendeePassword;
import kr.momo.domain.attendee.AttendeeRawPassword;
import kr.momo.domain.attendee.AttendeeRepository;
import kr.momo.domain.attendee.Role;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.MeetingErrorCode;
import kr.momo.service.attendee.dto.AttendeeLoginRequest;
import kr.momo.service.attendee.dto.AttendeeLoginResponse;
import kr.momo.service.auth.JwtManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final MeetingRepository meetingRepository;
    private final JwtManager jwtManager;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AttendeeLoginResponse login(String uuid, AttendeeLoginRequest request) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));

        AttendeeName name = new AttendeeName(request.attendeeName());
        AttendeeRawPassword rawPassword = new AttendeeRawPassword(request.password());

        return attendeeRepository.findByMeetingAndName(meeting, name)
                .map(attendee -> verifyPassword(attendee, rawPassword))
                .orElseGet(() -> signup(meeting, name, rawPassword));
    }

    private AttendeeLoginResponse verifyPassword(Attendee attendee, AttendeeRawPassword rawPassword) {
        attendee.verifyPassword(rawPassword, passwordEncoder);
        return AttendeeLoginResponse.from(jwtManager.generate(attendee.getId()), attendee);
    }

    private AttendeeLoginResponse signup(Meeting meeting, AttendeeName name, AttendeeRawPassword rawPassword) {
        AttendeePassword password = rawPassword.encodePassword(passwordEncoder);
        Attendee attendee = new Attendee(meeting, name, password, Role.GUEST);
        attendeeRepository.save(attendee);
        return AttendeeLoginResponse.from(jwtManager.generate(attendee.getId()), attendee);
    }

    @Transactional(readOnly = true)
    public List<String> findAll(String uuid) {
        Meeting meeting = meetingRepository.findByUuid(uuid)
                .orElseThrow(() -> new MomoException(MeetingErrorCode.INVALID_UUID));
        List<Attendee> attendees = attendeeRepository.findAllByMeeting(meeting);

        return attendees.stream()
                .map(Attendee::name)
                .toList();
    }

    /**
     * TEMP: 비밀번호 마이그레이션 이후 삭제될 메서드입니다.
     */
    @Transactional
    public Integer updateAllPassword() {
        List<Attendee> attendees = attendeeRepository.findAll();
        List<Attendee> rawAttendees = attendees.stream()
                .filter(attendee -> attendee.getPassword().getPassword().length() < 15)
                .toList();
        rawAttendees.forEach(
                attendee -> {
                    String rawPassword = attendee.getPassword().getPassword();
                    String encodedPassword = passwordEncoder.encode(rawPassword);
                    attendee.updatePassword(encodedPassword);
                }
        );
        attendeeRepository.saveAll(rawAttendees);
        return rawAttendees.size();
    }
}
