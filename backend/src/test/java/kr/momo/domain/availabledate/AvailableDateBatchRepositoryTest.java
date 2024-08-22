package kr.momo.domain.availabledate;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import kr.momo.domain.meeting.Meeting;
import kr.momo.domain.meeting.MeetingRepository;
import kr.momo.fixture.AvailableDateFixture;
import kr.momo.fixture.MeetingFixture;
import kr.momo.support.IsolateDatabase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@IsolateDatabase
class AvailableDateBatchRepositoryTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AvailableDateBatchRepository availableDateBatchRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    private Meeting meeting;

    @BeforeEach
    void setUp() {
        meeting = meetingRepository.save(MeetingFixture.COFFEE.create());
    }

    @DisplayName("AvailableDate 리스트를 Batch Insert 한다.")
    @Test
    void batchInsertTest() {
        List<AvailableDate> availableDate = List.of(
                AvailableDateFixture.TODAY.create(meeting),
                AvailableDateFixture.TOMORROW.create(meeting)
        );

        availableDateBatchRepository.batchInsert(availableDate);

        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM available_date", Integer.class);
        assertThat(count).isEqualTo(availableDate.size());
    }
}
