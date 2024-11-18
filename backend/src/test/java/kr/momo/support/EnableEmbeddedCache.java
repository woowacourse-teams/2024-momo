package kr.momo.support;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import kr.momo.config.PortKiller;
import kr.momo.config.TestRedisConfig;
import org.springframework.context.annotation.Import;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import({TestRedisConfig.class, PortKiller.class})
public @interface EnableEmbeddedCache {
}
