package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.DateTimeInterval;

public interface RecommendedScheduleGenerator {

    List<DateTimeInterval> recommend(String uuid, AttendeeGroup filteredGroup, String recommendType);
}
