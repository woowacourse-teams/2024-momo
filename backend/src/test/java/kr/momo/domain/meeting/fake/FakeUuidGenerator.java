package kr.momo.domain.meeting.fake;

import kr.momo.domain.meeting.UuidGenerator;

public class FakeUuidGenerator implements UuidGenerator {

    private static final String BASE_FAKE_UUID = "Momo";

    @Override
    public String generateUuid(int length) {
        StringBuilder uuid = new StringBuilder();
        while (uuid.length() < length) {
            uuid.append(BASE_FAKE_UUID);
        }

        return uuid.substring(0, length);
    }
}
