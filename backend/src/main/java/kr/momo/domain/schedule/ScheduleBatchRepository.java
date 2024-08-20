package kr.momo.domain.schedule;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class ScheduleBatchRepository {

    private static final int BATCH_SIZE = 1000;

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void batchInsert(List<Schedule> schedules) {
        String sql = """
                    INSERT INTO schedule (attendee_id, available_date_id, timeslot, created_at, modified_at)
                    VALUES (?, ?, ?, ?, ?);
                """;

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Schedule schedule = schedules.get(i);
                LocalDateTime now = LocalDateTime.now();
                ps.setLong(1, schedule.attendeeId());
                ps.setLong(2, schedule.availableDateId());
                ps.setString(3, schedule.getTimeslot().toString());
                ps.setTimestamp(4, Timestamp.valueOf(now));
                ps.setTimestamp(5, Timestamp.valueOf(now));
            }

            @Override
            public int getBatchSize() {
                return BATCH_SIZE;
            }
        });
    }
}
