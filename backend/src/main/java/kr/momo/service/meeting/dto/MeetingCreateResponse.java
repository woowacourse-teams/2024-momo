package kr.momo.service.meeting.dto;

import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.meeting.Meeting;

public record MeetingCreateResponse(String uuid, String hostName) {

    public static MeetingCreateResponse from(Meeting meeting, Attendee attendee) {
        return new MeetingCreateResponse(meeting.getUuid(), attendee.name());
    }
}
