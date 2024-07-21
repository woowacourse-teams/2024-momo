package com.woowacourse.momo.service.attendee;

import com.woowacourse.momo.auth.JwtManager;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeePassword;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AttendeeErrorCode;
import com.woowacourse.momo.service.attendee.dto.AttendeeLoginRequest;
import com.woowacourse.momo.service.attendee.dto.TokenResponse;
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
                .orElseThrow(() -> new MomoException(AttendeeErrorCode.INVALID_UUID));

        AttendeeName name = new AttendeeName(request.name());
        AttendeePassword password = new AttendeePassword(request.password());

        return attendeeRepository.findByMeetingAndName(meeting, name)
                .map(attendee -> verifyPassword(attendee, password))
                .orElseGet(() -> signup(meeting, name, password));
    }

    private TokenResponse verifyPassword(Attendee attendee, AttendeePassword password) {
        attendee.verifyPassword(password);
        return new TokenResponse(jwtManager.generate(attendee));
    }

    private TokenResponse signup(Meeting meeting, AttendeeName name, AttendeePassword password) {
        Attendee attendee = new Attendee(meeting, name, password, Role.GUEST);
        attendeeRepository.save(attendee);
        return new TokenResponse(jwtManager.generate(attendee));
    }
}
