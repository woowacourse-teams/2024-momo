package kr.momo.config.filter;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.filter.Filter;
import ch.qos.logback.core.spi.FilterReply;
import java.util.List;

public class InfoLogFilter extends Filter<ILoggingEvent> {

    private final List<String> classNames = List.of(
            "LogGenerator", "SpringApplication", "TomcatWebServer", "HikariPool"
    );

    @Override
    public FilterReply decide(ILoggingEvent iLoggingEvent) {
        if (isNotFilteredLog(iLoggingEvent)) {
            return FilterReply.ACCEPT;
        }
        return FilterReply.DENY;
    }

    private boolean isNotFilteredLog(ILoggingEvent iLoggingEvent) {
        StackTraceElement[] callerData = iLoggingEvent.getCallerData();
        String className = callerData[0].getClassName();
        return classNames.stream().anyMatch(className::contains);
    }
}
