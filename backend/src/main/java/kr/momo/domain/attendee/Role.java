package kr.momo.domain.attendee;

public enum Role {

    HOST,
    GUEST;

    public boolean isNotHost() {
        return !HOST.equals(this);
    }
}
