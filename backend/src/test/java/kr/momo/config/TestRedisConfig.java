package kr.momo.config;

import java.io.IOException;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.test.context.TestConfiguration;
import redis.embedded.RedisServer;

@TestConfiguration
public class TestRedisConfig {

    private final RedisServer redisServer;

    public TestRedisConfig(RedisProperties redisProperties) throws IOException {
        this.redisServer = new RedisServer(redisProperties.getPort());
    }

    public void start() throws IOException {
        redisServer.start();
    }

    public void stop() throws IOException {
        if (redisServer.isActive()) {
            redisServer.stop();
        }
    }
}
