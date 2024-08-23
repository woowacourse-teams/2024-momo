package kr.momo.domain.attendee;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import kr.momo.fixture.AttendeeFixture;
import kr.momo.fixture.MeetingFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AttendeeGroupTest {

    @DisplayName("참가자의 이름이 중복이면 예외를 발생시킨다.")
    @Test
    void validateUniqueAttendeeNames() {
        Meeting meeting = MeetingFixture.DINNER.create();
        Attendee jazz = AttendeeFixture.HOST_JAZZ.create(meeting);
        Attendee pedro1 = AttendeeFixture.GUEST_PEDRO.create(meeting);
        Attendee pedro2 = AttendeeFixture.GUEST_PEDRO.create(meeting);
        List<Attendee> attendees = List.of(jazz, pedro1, pedro2);

        assertThatThrownBy(() -> new AttendeeGroup(attendees))
                .isInstanceOf(MomoException.class)
                .hasMessage(AttendeeErrorCode.DUPLICATED_ATTENDEE_NAME.message());
    }

    @DisplayName("현재 그룹이 다른 그룹의 모든 참가자를 포함하는지 확인한다.")
    @Test
    void containsAllTest() {
        // given
        Attendee jazz = AttendeeFixture.HOST_JAZZ.create(MeetingFixture.DINNER.create());
        Attendee daon = AttendeeFixture.GUEST_DAON.create(MeetingFixture.DINNER.create());
        Attendee bakey = AttendeeFixture.GUEST_BAKEY.create(MeetingFixture.DINNER.create());
        AttendeeGroup group = new AttendeeGroup(List.of(jazz, daon, bakey));
        AttendeeGroup subGroup = new AttendeeGroup(List.of(jazz, daon));

        // when & then
        assertThat(group.containsAll(subGroup)).isTrue();
    }
}
