package com.woowacourse.momo.service.meeting;

import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.AttendeeRepository;
import com.woowacourse.momo.domain.availabledate.AvailableDate;
import com.woowacourse.momo.domain.availabledate.AvailableDateRepository;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.meeting.MeetingRepository;
import com.woowacourse.momo.domain.schedule.Schedule;
import com.woowacourse.momo.domain.schedule.ScheduleRepository;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import com.woowacourse.momo.service.meeting.dto.MeetingResponse;
import java.time.LocalDate;
import java.util.UUID;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
class MeetingServiceTest {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AvailableDateRepository availableDateRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @BeforeEach
    void setup() {
        scheduleRepository.deleteAllInBatch();
        availableDateRepository.deleteAllInBatch();
        meetingRepository.deleteAllInBatch();
        attendeeRepository.deleteAllInBatch();
    }

    @DisplayName("UUID로 약속 정보를 조회한다.")
    @Test
    void findByUUID() {
        // given
        String uuid = UUID.randomUUID().toString();
        Attendee host = attendeeRepository.save(new Attendee(null, new AttendeeName("페드로"), ""));
        String meetingName = "주먹 대결";
        Meeting boxingWithPedro = meetingRepository.save(
                new Meeting(
                        null,
                        meetingName,
                        uuid,
                        Timeslot.TIME_0000,
                        Timeslot.TIME_0400,
                        host
                )
        );
        for (int i = 0; i < 7; i++) {
            availableDateRepository.save(new AvailableDate(null, LocalDate.now().minusDays(i + 1), boxingWithPedro));
        }
        AvailableDate availableDate = availableDateRepository.findAll().get(0);
        scheduleRepository.save(new Schedule(null, boxingWithPedro, host, Timeslot.TIME_0300, availableDate));
        scheduleRepository.save(new Schedule(null, boxingWithPedro, host, Timeslot.TIME_0100, availableDate));

        // when
        MeetingResponse result = meetingService.findByUUID(uuid);

        // then
        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(result.meetingName()).isEqualTo(meetingName);
        softAssertions.assertThat(result.availableDates().get(0)).isEqualTo(LocalDate.now().minusDays(1));
        softAssertions.assertAll();
    }
}
