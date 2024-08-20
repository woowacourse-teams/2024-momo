package kr.momo.domain.schedule;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ParameterizedPreparedStatementSetter;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class ScheduleBatchRepository {

    private static final int BATCH_SIZE = 1000;

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void batchInsert(Collection<Schedule> schedules) {
        String sql = """
                INSERT INTO schedule (attendee_id, available_date_id, timeslot, created_at, modified_at)
                VALUES (?, ?, ?, ?, ?);
                """;

        executeBatchUpdate(schedules, sql);
    }

    private void executeBatchUpdate(Collection<Schedule> schedules, String sql) {
        LocalDateTime now = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(now);

        jdbcTemplate.batchUpdate(sql, schedules, BATCH_SIZE, createPreparedStatementSetter(timestamp));
    }

    private ParameterizedPreparedStatementSetter<Schedule> createPreparedStatementSetter(Timestamp timestamp) {
        return (PreparedStatement ps, Schedule schedule) -> {
            ps.setLong(1, schedule.attendeeId());
            ps.setLong(2, schedule.availableDateId());
            ps.setString(3, schedule.getTimeslot().toString());
            ps.setTimestamp(4, timestamp);
            ps.setTimestamp(5, timestamp);
        };
    }
}
