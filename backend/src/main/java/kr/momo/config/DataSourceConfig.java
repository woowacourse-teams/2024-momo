package kr.momo.config;

import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

@Configuration
@Profile("prod")
public class DataSourceConfig {

    public static final String SOURCE_SERVER = "source";
    public static final String REPLICA_SERVER = "replica";

    @Bean(SOURCE_SERVER)
    @ConfigurationProperties(prefix = "spring.datasource.source")
    public DataSource sourceDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean(REPLICA_SERVER)
    @ConfigurationProperties(prefix = "spring.datasource.replica")
    public DataSource replicaDataSource() {
        return DataSourceBuilder.create()
                .build();
    }

    @Bean
    public DataSource routingDataSource(
            @Qualifier(SOURCE_SERVER) DataSource source,
            @Qualifier(REPLICA_SERVER) DataSource replica
    ) {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        Map<Object, Object> dataSourceMap = Map.of(
                SOURCE_SERVER, source,
                REPLICA_SERVER, replica
        );
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(source);
        return routingDataSource;
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        DataSource dataSource = routingDataSource(sourceDataSource(), replicaDataSource());
        return new LazyConnectionDataSourceProxy(dataSource);
    }
}
