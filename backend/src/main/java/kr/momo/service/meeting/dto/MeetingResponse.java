package kr.momo.service.meeting.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import kr.momo.domain.attendee.Attendee;
import kr.momo.domain.availabledate.AvailableDate;
import kr.momo.domain.availabledate.AvailableDates;
import kr.momo.domain.meeting.Meeting;

public record MeetingResponse(
        String meetingName,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime firstTime,
        @JsonFormat(shape = Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul") LocalTime lastTime,
        boolean isLocked,
        List<LocalDate> availableDates,
        List<String> attendeeNames
) {

    public static MeetingResponse of(Meeting meeting, AvailableDates availableDates, List<Attendee> attendees) {
        List<LocalDate> dates = availableDates.getAvailableDates().stream()
                .map(AvailableDate::getDate)
                .toList();

        List<String> attendeeNames = attendees.stream()
                .map(Attendee::name)
                .toList();

        return new MeetingResponse(
                meeting.getName(),
                meeting.startTimeslotTime(),
                meeting.endTimeslotTime(),
                meeting.isLocked(),
                dates,
                attendeeNames
        );
    }
}
