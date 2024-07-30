package kr.momo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MomoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MomoApplication.class, args);
    }
}
