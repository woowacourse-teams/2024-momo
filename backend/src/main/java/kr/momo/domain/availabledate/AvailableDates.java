package kr.momo.domain.availabledate;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import kr.momo.domain.meeting.Meeting;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.AvailableDateErrorCode;
import lombok.Getter;

@Getter
public class AvailableDates {

    private final List<AvailableDate> availableDates;

    public AvailableDates(List<LocalDate> dates, Meeting meeting) {
        validateUniqueDates(dates);
        this.availableDates = dates.stream()
                .map(date -> new AvailableDate(date, meeting))
                .toList();
    }

    public AvailableDates(List<AvailableDate> availableDates) {
        this.availableDates = availableDates;
    }

    private void validateUniqueDates(List<LocalDate> dates) {
        Set<LocalDate> dateSet = new HashSet<>(dates);
        if (dateSet.size() != dates.size()) {
            throw new MomoException(AvailableDateErrorCode.DUPLICATED_DATE);
        }
    }

    public boolean isAllBefore(LocalDate other) {
        return availableDates.stream()
                .anyMatch(date -> date.isBefore(other));
    }

    public AvailableDate findByDate(LocalDate other) {
        return availableDates.stream()
                .filter(availableDate -> availableDate.isSameDate(other))
                .findFirst()
                .orElseThrow(() -> new MomoException(AvailableDateErrorCode.INVALID_AVAILABLE_DATE));
    }
}
