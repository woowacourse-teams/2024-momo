package kr.momo.fixture;

import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.meeting.Meeting;

public enum AttendeeGroupFixture {

    JAZZ_DAON(List.of(AttendeeFixture.HOST_JAZZ, AttendeeFixture.GUEST_DAON)),
    JAZZ_DAON_BAKEY(List.of(AttendeeFixture.HOST_JAZZ, AttendeeFixture.GUEST_DAON, AttendeeFixture.GUEST_BAKEY));

    private final List<AttendeeFixture> attendees;

    AttendeeGroupFixture(List<AttendeeFixture> attendees) {
        this.attendees = attendees;
    }

    public AttendeeGroup create() {
        Meeting meeting = MeetingFixture.DINNER.create();
        List<Attendee> group = attendees.stream().map(attendee -> attendee.create(meeting)).toList();
        return new AttendeeGroup(group);
    }
}
