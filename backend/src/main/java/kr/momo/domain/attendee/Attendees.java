package kr.momo.domain.attendee;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.Getter;

@Getter
public class Attendees {

    private final List<Attendee> attendees;

    public Attendees(List<Attendee> attendees) {
        validateDuplicatedDates(attendees);
        this.attendees = attendees;
    }

    public void validateDuplicatedDates(List<Attendee> attendees) {
        long distinctCount = attendees.stream()
                .map(Attendee::name)
                .distinct()
                .count();
        if (attendees.size() != distinctCount) {
            throw new MomoException(AttendeeErrorCode.DUPLICATED_ATTENDEE_NAME);
        }
    }

    public boolean isSameGroup(Attendees others) {
        Set<AttendeeName> attendeeNames = attendees
                .stream()
                .map(Attendee::getName)
                .collect(Collectors.toSet());
        Set<AttendeeName> otherNames = others.getAttendees()
                .stream()
                .map(Attendee::getName)
                .collect(Collectors.toSet());
        return attendeeNames.equals(otherNames);
    }

    public Attendees filterAttendeesByName(List<String> names) {
        List<Attendee> filteredAttendee = attendees.stream()
                .filter(attendee -> names.contains(attendee.name()))
                .toList();
        return new Attendees(filteredAttendee);
    }

}
