package kr.momo.config;

import jakarta.annotation.PreDestroy;
import java.io.IOException;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.test.context.TestConfiguration;
import redis.embedded.RedisServer;

@TestConfiguration
public class TestRedisConfig {

    private final PortKiller portKiller;
    private final RedisProperties redisProperties;
    private RedisServer redisServer;

    public TestRedisConfig(PortKiller portKiller, RedisProperties redisProperties) {
        this.portKiller = portKiller;
        this.redisProperties = redisProperties;
    }

    public void start() throws IOException {
        portKiller.killProcessUsingPort(redisProperties.getPort());
        redisServer = new RedisServer(redisProperties.getPort());
        redisServer.start();
    }

    @PreDestroy
    public void stop() throws IOException {
        if (redisServer != null && redisServer.isActive()) {
            redisServer.stop();
        }
    }
}
