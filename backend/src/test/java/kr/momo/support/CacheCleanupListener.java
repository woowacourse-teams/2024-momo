package kr.momo.support;

import java.io.IOException;
import java.util.Objects;
import kr.momo.config.TestRedisConfig;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.TestContext;
import org.springframework.test.context.support.AbstractTestExecutionListener;
import reactor.util.annotation.NonNull;

public class CacheCleanupListener extends AbstractTestExecutionListener {

    @Override
    public void beforeTestClass(@NonNull TestContext testContext) throws IOException {
        TestRedisConfig redisConfig = testContext.getApplicationContext()
                .getBean(TestRedisConfig.class);
        redisConfig.start();
    }

    @Override
    public void afterTestMethod(@NonNull TestContext testContext) {
        CacheManager cacheManager = testContext.getApplicationContext()
                .getBean(CacheManager.class);

        for (String name : cacheManager.getCacheNames()) {
            Cache cache = cacheManager.getCache(name);
            Objects.requireNonNull(cache).clear();
        }
    }

    @Override
    public void afterTestClass(TestContext testContext) throws Exception {
        TestRedisConfig redisConfig = testContext.getApplicationContext()
                .getBean(TestRedisConfig.class);
        redisConfig.stop();
    }
}
