package kr.momo.service.schedule;

import java.util.List;
import kr.momo.domain.attendee.AttendeeGroup;
import kr.momo.domain.schedule.CandidateSchedule;

public interface RecommendedScheduleGenerator {

    List<CandidateSchedule> recommend(AttendeeGroup filteredGroup, String recommendType);
}
