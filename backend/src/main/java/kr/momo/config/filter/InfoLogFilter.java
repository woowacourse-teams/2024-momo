package kr.momo.config.filter;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;

public class InfoLogFilter extends Filter<ILoggingEvent> {
    @Override
    public FilterReply decide(ILoggingEvent iLoggingEvent) {
        if (iLoggingEvent.getMessage().contains("REQUEST") || iLoggingEvent.getMessage().contains("RESPONSE")) {
            return FilterReply.ACCEPT;
        }
        return FilterReply.DENY;
    }
}
