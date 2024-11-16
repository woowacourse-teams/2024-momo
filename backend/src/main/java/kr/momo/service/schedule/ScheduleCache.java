package kr.momo.service.schedule;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.momo.config.constant.CacheType;
import kr.momo.exception.MomoException;
import kr.momo.exception.code.CacheErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduleCache {

    private final ObjectMapper objectMapper;
    private final CacheManager cacheManager;

    public boolean isHit(CacheType cacheType, String key) {
        Cache cache = cacheManager.getCache(cacheType.getName());
        if (cache == null) {
            return false;
        }
        String json = cache.get(key, String.class);
        return json != null;
    }

    public <T> T get(CacheType cacheType, String key, Class<T> clazz) {
        String cacheName = cacheType.getName();
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null || cache.get(key, String.class) == null) {
            throw new RuntimeException();
        }
        String value = cache.get(key, String.class);
        log.debug("CACHE NAME: {}, KEY: {}, STATE: HIT", cacheName, key);
        return convertObject(cacheName, key, clazz, value);
    }

    private <T> T convertObject(String cacheName, String key, Class<T> clazz, String value) {
        try {
            return objectMapper.readValue(value, clazz);
        } catch (JsonProcessingException e) {
            log.error("캐시 값을 JSON으로 변환하는데 실패했습니다. CACHE NAME: {}, KEY: {}", cacheName, key);
            throw new MomoException(CacheErrorCode.CACHE_JSON_PROCESSING_ERROR);
        }
    }

    public <T> void put(CacheType cacheType, String key, T value) {
        String cacheName = cacheType.getName();
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            log.error("캐싱에 해당하는 이름이 존재하지 않습니다. 캐싱 이름: {}", cacheName);
            return;
        }
        log.debug("CACHE NAME: {}, KEY: {}, STATE: MISS", cacheName, key);
        cache.put(key, convertJson(cacheName, key, value));
    }

    private <T> String convertJson(String cacheName, String key, T value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            log.error("캐시 값을 객체로 변환하는데 실패했습니다. CACHE NAME: {}, KEY: {}", cacheName, key);
            throw new MomoException(CacheErrorCode.DATA_DESERIALIZATION_ERROR);
        }
    }

    public void delete(CacheType cacheType, String key) {
        String cacheName = cacheType.getName();
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            return;
        }
        cache.evict(key);
        log.debug("CACHE NAME: {}, KEY: {}, STATE: EVICT", cacheName, key);
    }
}
