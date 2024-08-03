package kr.momo.domain.attendee;

import java.util.HashSet;
import java.util.List;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode
public class AttendeeGroup {

    private final List<Attendee> attendees;

    public AttendeeGroup(List<Attendee> attendees) {
        validateUniqueNames(attendees);
        this.attendees = attendees;
    }

    private void validateUniqueNames(List<Attendee> attendees) {
        if (isNotUnique(attendees)) {
            throw new MomoException(AttendeeErrorCode.DUPLICATED_ATTENDEE_NAME);
        }
    }

    private boolean isNotUnique(List<Attendee> attendees) {
        return !attendees.stream()
                .map(Attendee::name)
                .allMatch(new HashSet<>()::add);
    }

    public AttendeeGroup filterAttendeesByName(List<String> names) {
        List<Attendee> filteredAttendee = attendees.stream()
                .filter(attendee -> names.contains(attendee.name()))
                .toList();
        return new AttendeeGroup(filteredAttendee);
    }
}
