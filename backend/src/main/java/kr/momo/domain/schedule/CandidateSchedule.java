package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.timeslot.Timeslot;

public record CandidateSchedule(
        LocalDateTime startDateTime, LocalDateTime endDateTime, AttendeeGroup attendeeGroup
) {

    public CandidateSchedule(DateTimeInterval dateTimeInterval, AttendeeGroup attendeeGroup) {
        this(dateTimeInterval.startDateTime(), dateTimeInterval.endDateTime(), attendeeGroup);
    }

    public static List<CandidateSchedule> mergeContinuousDateTime(List<LocalDateTime> dateTimes, AttendeeGroup group) {
        if (dateTimes.isEmpty()) {
            return Collections.emptyList();
        }

        Iterator<LocalDateTime> iterator = dateTimes.iterator();

        List<CandidateSchedule> responses = new ArrayList<>();
        LocalDateTime startDateTime = iterator.next();
        LocalDateTime currentDateTime = startDateTime;

        while (iterator.hasNext()) {
            LocalDateTime nextDateTime = iterator.next();

            if (isContinuousDateTime(currentDateTime, nextDateTime)) {
                // TODO: Timeslot.DURATION_IN_MINUTE을 굳이 DateTimeInterval이 알아야 하는가?
                responses.add(new CandidateSchedule(startDateTime, currentDateTime.plusMinutes(Timeslot.DURATION_IN_MINUTE), group));
                startDateTime = nextDateTime;
            }
            currentDateTime = nextDateTime;
        }
        responses.add(new CandidateSchedule(startDateTime, currentDateTime.plusMinutes(Timeslot.DURATION_IN_MINUTE), group));
        return responses;
    }

    private static boolean isContinuousDateTime(LocalDateTime now, LocalDateTime next) {
        return !(now.plusMinutes(Timeslot.DURATION_IN_MINUTE).equals(next));
    }

    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }

    public int groupSize() {
        return attendeeGroup.size();
    }
}
