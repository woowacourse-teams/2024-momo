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

    private final List<AvailableDate> dates;

    public AvailableDates(List<LocalDate> dates, Meeting meeting) {
        validateDuplicatedDates(dates);
        this.dates = dates.stream()
                .map(date -> new AvailableDate(date, meeting))
                .toList();
    }

    private void validateDuplicatedDates(List<LocalDate> dates) {
        Set<LocalDate> dateSet = new HashSet<>(dates);
        if (dateSet.size() != dates.size()) {
            throw new MomoException(AvailableDateErrorCode.DUPLICATED_DATE);
        }
    }
}
