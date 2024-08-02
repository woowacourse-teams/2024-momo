package kr.momo.service.meeting.dto;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.meeting.Meeting;

public record MeetingCreateResponse(String uuid, String name, String token) {

    public static MeetingCreateResponse from(Meeting meeting, Attendee attendee, String token) {
        return new MeetingCreateResponse(meeting.getUuid(), attendee.name(), token);
    }
}
