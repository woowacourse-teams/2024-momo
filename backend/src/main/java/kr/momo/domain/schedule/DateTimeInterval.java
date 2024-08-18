package kr.momo.domain.schedule;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import kr.momo.domain.timeslot.Timeslot;

public record DateTimeInterval(
        LocalDateTime startDateTime, LocalDateTime endDateTime
) {

    public static List<DateTimeInterval> mergeContinuousDateTime(List<LocalDateTime> dateTimes) {
        if (dateTimes.isEmpty()) {
            return Collections.emptyList();
        }

        Iterator<LocalDateTime> iterator = dateTimes.iterator();

        List<DateTimeInterval> responses = new ArrayList<>();
        LocalDateTime startDateTime = iterator.next();
        LocalDateTime currentDateTime = startDateTime;

        while (iterator.hasNext()) {
            LocalDateTime nextDateTime = iterator.next();

            if (isContinuousDateTime(currentDateTime, nextDateTime)) {
                // TODO: Timeslot.DURATION_IN_MINUTE을 굳이 DateTimeInterval이 알아야 하는가?
                responses.add(new DateTimeInterval(startDateTime, currentDateTime.plusMinutes(Timeslot.DURATION_IN_MINUTE)));
                startDateTime = nextDateTime;
            }
            currentDateTime = nextDateTime;
        }
        responses.add(new DateTimeInterval(startDateTime, currentDateTime.plusMinutes(Timeslot.DURATION_IN_MINUTE)));
        return responses;
    }

    private static boolean isContinuousDateTime(LocalDateTime now, LocalDateTime next) {
        return !(now.plusMinutes(Timeslot.DURATION_IN_MINUTE).equals(next));
    }

    public Duration duration() {
        return Duration.between(startDateTime, endDateTime);
    }
}
