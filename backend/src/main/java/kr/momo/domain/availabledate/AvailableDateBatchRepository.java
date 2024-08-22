package kr.momo.domain.availabledate;

import java.sql.Date;
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
public class AvailableDateBatchRepository {

    private static final int BATCH_SIZE = 30;

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void batchInsert(Collection<AvailableDate> availableDates) {
        String sql = """
                INSERT INTO available_date (date, meeting_id, created_at, modified_at)
                VALUES (?, ?, ?, ?);
                """;

        executeBatchUpdate(availableDates, sql);
    }

    private void executeBatchUpdate(Collection<AvailableDate> availableDates, String sql) {
        LocalDateTime now = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(now);

        jdbcTemplate.batchUpdate(sql, availableDates, BATCH_SIZE, createPreparedStatementSetter(timestamp));
    }

    private ParameterizedPreparedStatementSetter<AvailableDate> createPreparedStatementSetter(Timestamp timestamp) {
        return (PreparedStatement ps, AvailableDate availableDate) -> {
            ps.setDate(1, Date.valueOf(availableDate.getDate()));
            ps.setLong(2, availableDate.meetingId());
            ps.setTimestamp(3, timestamp);
            ps.setTimestamp(4, timestamp);
        };
    }
}
