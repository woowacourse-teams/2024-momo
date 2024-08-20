package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.BiPredicate;
import kr.momo.domain.attendee.AttendeeGroup;

public record CandidateSchedule(
        DateTimeInterval dateTimeInterval, AttendeeGroup attendeeGroup
) {

    public static CandidateSchedule of(
            LocalDateTime startDateTime, LocalDateTime endDateTime, AttendeeGroup attendeeGroup
    ) {
        return new CandidateSchedule(new DateTimeInterval(startDateTime, endDateTime), attendeeGroup);
    }

    public static List<CandidateSchedule> mergeContinuousDateTime(
            List<CandidateSchedule> sortedSchedules, BiPredicate<CandidateSchedule, CandidateSchedule> isDiscontinuous
    ) {
        if (sortedSchedules.isEmpty()) {
            return Collections.emptyList();
        }

        Iterator<CandidateSchedule> iterator = sortedSchedules.iterator();

        List<CandidateSchedule> responses = new ArrayList<>();
        CandidateSchedule startDateTime = iterator.next();
        CandidateSchedule currentDateTime = startDateTime;

        while (iterator.hasNext()) {
            CandidateSchedule nextDateTime = iterator.next();

            if (isDiscontinuous.test(currentDateTime, nextDateTime)) {
                responses.add(CandidateSchedule.of(startDateTime.startDateTime(), currentDateTime.endDateTime(),
                        startDateTime.attendeeGroup()));
                startDateTime = nextDateTime;
            }
            currentDateTime = nextDateTime;
        }
        responses.add(CandidateSchedule.of(startDateTime.startDateTime(), currentDateTime.endDateTime(),
                startDateTime.attendeeGroup()));
        return responses;
    }

    public LocalDateTime startDateTime() {
        return dateTimeInterval.startDateTime();
    }

    public LocalDateTime endDateTime() {
        return dateTimeInterval.endDateTime();
    }

    public Duration duration() {
        return dateTimeInterval.duration();
    }

    public int groupSize() {
        return attendeeGroup.size();
    }
}
