package com.woowacourse.momo.service.meeting.dto;

import com.woowacourse.momo.domain.meeting.Meeting;

public record MeetingCompletedResponse(String uuid) {

    public static MeetingCompletedResponse from(Meeting meeting) {
        return new MeetingCompletedResponse(meeting.getUuid());
    }
}
