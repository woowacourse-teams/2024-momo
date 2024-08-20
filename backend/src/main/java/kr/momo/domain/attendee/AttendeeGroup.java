package kr.momo.domain.attendee;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toList;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AttendeeErrorCode;
import lombok.Getter;

@Getter
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
        Set<String> attendeeNames = new HashSet<>(names);
        return attendees.stream()
                .filter(attendee -> attendeeNames.contains(attendee.name()))
                .collect(collectingAndThen(toList(), AttendeeGroup::new));
    }

    public boolean containsAll(AttendeeGroup group) {
        return new HashSet<>(attendees).containsAll(group.getAttendees());
    }

    public int size() {
        return attendees.size();
    }

    public Optional<Attendee> findHost() {
        return attendees.stream()
                .dropWhile(attendee -> !attendee.isHost())
                .findFirst();
    }

    public List<String> names() {
        return attendees.stream()
                .map(Attendee::name)
                .toList();
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }
        AttendeeGroup that = (AttendeeGroup) object;

        HashSet<Attendee> thatSet = new HashSet<>(that.getAttendees());
        HashSet<Attendee> set = new HashSet<>(getAttendees());
        return thatSet.equals(set);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAttendees());
    }
}
