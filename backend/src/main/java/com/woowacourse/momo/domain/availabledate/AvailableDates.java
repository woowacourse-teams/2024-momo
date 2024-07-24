package com.woowacourse.momo.domain.availabledate;

import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AvailableDateErrorCode;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;

@Getter
public class AvailableDates {

    private final List<AvailableDate> availableDates;

    public AvailableDates(List<LocalDate> dates, Meeting meeting) {
        validateDuplicatedDates(dates);
        this.availableDates = dates.stream()
                .map(date -> new AvailableDate(date, meeting))
                .toList();
    }

    public AvailableDates(List<AvailableDate> availableDates) {
        this.availableDates = availableDates;
    }

    private void validateDuplicatedDates(List<LocalDate> dates) {
        Set<LocalDate> dateSet = new HashSet<>(dates);
        if (dateSet.size() != dates.size()) {
            throw new MomoException(AvailableDateErrorCode.DUPLICATED_DATE);
        }
    }

    public AvailableDate findByDate(LocalDate other) {
        return availableDates.stream()
                .filter(availableDate -> availableDate.isSameDate(other))
                .findFirst()
                .orElseThrow(() -> new MomoException(AvailableDateErrorCode.INVALID_AVAILABLE_DATE));
    }
}
