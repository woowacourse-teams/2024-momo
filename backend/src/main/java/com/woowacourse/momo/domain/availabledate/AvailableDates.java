package com.woowacourse.momo.domain.availabledate;

import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AvailableDateErrorCode;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class AvailableDates {

    private final List<LocalDate> dates;

    public AvailableDates(List<LocalDate> dates) {
        validateDuplicatedDates(dates);
        this.dates = dates;
    }

    private void validateDuplicatedDates(List<LocalDate> dates) {
        Set<LocalDate> dateSet = new HashSet<>(dates);
        if (dateSet.size() != dates.size()) {
            throw new MomoException(AvailableDateErrorCode.DUPLICATED_DATE);
        }
    }

    public List<AvailableDate> assignMeeting(Meeting meeting) {
        return dates.stream()
                .map(date -> new AvailableDate(date, meeting))
                .toList();
    }
}
