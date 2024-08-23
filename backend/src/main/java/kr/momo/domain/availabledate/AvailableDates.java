package kr.momo.domain.availabledate;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AvailableDateErrorCode;
import lombok.Getter;

@Getter
public class AvailableDates {

    private final SortedSet<AvailableDate> availableDates;

    public AvailableDates(List<LocalDate> dates, Meeting meeting) {
        this.availableDates = dates.stream()
                .map(date -> new AvailableDate(date, meeting))
                .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(AvailableDate::getDate))));
    }

    public AvailableDates(List<AvailableDate> availableDates) {
        this.availableDates = availableDates.stream()
                .collect(Collectors.toCollection(() -> new TreeSet<>(Comparator.comparing(AvailableDate::getDate))));
    }

    public boolean isAnyBefore(LocalDate other) {
        LocalDate minimumDate = availableDates.first().getDate();
        return minimumDate.isBefore(other);
    }

    public AvailableDate findByDate(LocalDate other) {
        return availableDates.stream()
                .filter(availableDate -> availableDate.isSameDate(other))
                .findFirst()
                .orElseThrow(() -> new MomoException(AvailableDateErrorCode.INVALID_AVAILABLE_DATE));
    }

    public boolean notExistsByDate(LocalDate other) {
        Meeting meeting = availableDates.first().getMeeting();
        return !availableDates.contains(new AvailableDate(other, meeting));
    }

    public boolean isNotConsecutiveDay(LocalDate startDateInclusive, LocalDate endDateInclusive) {
        long availableDateRangeCount = availableDates.stream()
                .dropWhile(date -> date.isBefore(startDateInclusive))
                .takeWhile(date -> !date.isAfter(endDateInclusive))
                .count();

        return isNotDateCountEqual(startDateInclusive, endDateInclusive, availableDateRangeCount);
    }

    private boolean isNotDateCountEqual(LocalDate startDateInclusive, LocalDate endDateInclusive, long count) {
        return count != endDateInclusive.toEpochDay() - startDateInclusive.toEpochDay() + 1;
    }

    public List<LocalDate> asList() {
        return availableDates.stream()
                .map(AvailableDate::getDate)
                .toList();
    }
}
