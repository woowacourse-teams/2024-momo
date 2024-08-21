package kr.momo.domain.attendee;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.IntStream;
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

    public int size() {
        return attendees.size();
    }

    public List<AttendeeGroup> findAttendeeGroupCombinationsOverSize(int minSize) {
        if (minSize < 1 || minSize > attendees.size()) {
            throw new MomoException(AttendeeErrorCode.INVALID_ATTENDEE_SIZE);
        }

        List<AttendeeGroup> array = new ArrayList<>();
        for (int i = attendees.size(); i >= minSize; i--) {
            array.addAll(generateCombinations(i));
        }
        return array;
    }

    private List<AttendeeGroup> generateCombinations(int groupSize) {
        return IntStream.range(0, (1 << attendees.size()))
                .filter(mask -> Integer.bitCount(mask) == groupSize)
                .mapToObj(this::createGroupFromMask)
                .toList();
    }

    private AttendeeGroup createGroupFromMask(int mask) {
        List<Attendee> group = new ArrayList<>();
        for (int i = 0; i < attendees.size(); i++) {
            if ((mask & (1 << i)) != 0) {
                group.add(attendees.get(i));
            }
        }
        return new AttendeeGroup(group);
    }

    public boolean isSameSize(AttendeeGroup attendeeGroup) {
        return attendees.size() == attendeeGroup.size();
    }

    public Optional<Attendee> findHost() {
        for (Attendee attendee : attendees) {
            if (attendee.isHost()) {
                return Optional.of(attendee);
            }
        }
        return Optional.empty();
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
