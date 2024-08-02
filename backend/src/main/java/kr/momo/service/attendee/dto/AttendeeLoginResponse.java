package kr.momo.service.attendee.dto;

import kr.momo.domain.attendee.Attendee;

public record AttendeeLoginResponse(String token, String name) {

    public static AttendeeLoginResponse from(String token, Attendee attendee) {
        return new AttendeeLoginResponse(token, attendee.name());
    }
}
