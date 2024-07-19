package com.woowacourse.momo.auth;

import com.woowacourse.momo.auth.dto.TokenInfo;
import com.woowacourse.momo.domain.attendee.Attendee;
import com.woowacourse.momo.domain.attendee.AttendeeName;
import com.woowacourse.momo.domain.attendee.Role;
import com.woowacourse.momo.domain.meeting.Meeting;
import com.woowacourse.momo.domain.timeslot.Timeslot;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JwtManagerTest {

    @DisplayName("참가자의 정보를 이용하여 jwt 토큰을 발행한다.")
    @Test
    void generate() {
        long attendeeId = 1L;
        String attendeeName = "daon";
        Attendee attendee = new Attendee(attendeeId,
                new Meeting(1L, "daon-world", "1234", Timeslot.TIME_0030, Timeslot.TIME_0100),
                new AttendeeName(attendeeName), "1234", Role.GUEST);
        JwtManager jwtManager = new JwtManager("1234");
        String token = jwtManager.generate(attendee);

        TokenInfo tokenInfo = jwtManager.extract(token);

        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(tokenInfo.id()).isEqualTo(attendeeId);
        softAssertions.assertThat(tokenInfo.nickname()).isEqualTo(attendeeName);
        softAssertions.assertAll();
    }
}
