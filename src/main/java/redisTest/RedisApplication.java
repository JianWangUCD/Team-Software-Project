package redisTest;

import org.redisson.Redisson;
import org.redisson.config.Config;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.ObjectInputFilter;

@SpringBootApplication
public class RedisApplication {

    public static void main(String[] args) {

        SpringApplication.run(RedisApplication.class, args);
    }
    @Bean
    public Redisson redisson(){
        //standalone
        Config config = new Config();
        config.useSingleServer().setAddress("redis://localhost:6379").setDatabase(0);
        return (Redisson) Redisson.create(config);
    }

}
