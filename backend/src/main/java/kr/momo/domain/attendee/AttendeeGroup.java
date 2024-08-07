package kr.momo.domain.attendee;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
        Set<String> attendeeNames = new HashSet<>(names);
        return attendees.stream()
                .filter(attendee -> attendeeNames.contains(attendee.name()))
                .collect(collectingAndThen(toList(), AttendeeGroup::new));
    }

    public int size() {
        return attendees.size();
    }

    public List<AttendeeGroup> findAttendeeGroupCombination() {
        Map<Attendee, Boolean> visited = new HashMap<>();
        List<AttendeeGroup> groupCombination = new ArrayList<>();
        addCombinationAttendeeGroup(visited, groupCombination, 0);
        return groupCombination;
    }

    private void addCombinationAttendeeGroup(
            Map<Attendee, Boolean> isVisit, List<AttendeeGroup> groupCombination, int index
    ) {
        if (index == attendees.size()) {
            AttendeeGroup attendeeGroup = groupIfAttendee(isVisit);
            groupCombination.add(attendeeGroup);
            return;
        }

        if (index < attendees.size()) {
            isVisit.put(attendees.get(index), Boolean.TRUE);
            addCombinationAttendeeGroup(isVisit, groupCombination, index + 1);
            isVisit.put(attendees.get(index), Boolean.FALSE);
            addCombinationAttendeeGroup(isVisit, groupCombination, index + 1);
        }
    }

    private AttendeeGroup groupIfAttendee(Map<Attendee, Boolean> isVisit) {
        return attendees.stream()
                .filter(isVisit::get)
                .collect(collectingAndThen(toList(), AttendeeGroup::new));
    }

    public boolean isSameSize(AttendeeGroup attendeeGroup) {
        return attendees.size() == attendeeGroup.size();
    }
}
