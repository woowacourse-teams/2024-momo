package com.woowacourse.momo.service.meeting.dto;

import com.woowacourse.momo.domain.meeting.Meeting;

public record MeetingSharingResponse(String uuid) {

    public static MeetingSharingResponse from(Meeting meeting) {
        return new MeetingSharingResponse(meeting.getUuid());
    }
}
