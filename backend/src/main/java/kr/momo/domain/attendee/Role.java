package kr.momo.domain.attendee;

public enum Role {

    HOST,
    GUEST;

    public boolean isHost() {
        return HOST.equals(this);
    }
}
