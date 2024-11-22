package kr.momo.support;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.TestExecutionListeners.MergeMode;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@TestExecutionListeners(
        value = {CacheCleanupListener.class, DatabaseCleanupListener.class},
        mergeMode = MergeMode.MERGE_WITH_DEFAULTS
)
public @interface IsolateDatabaseAndCache {
}
