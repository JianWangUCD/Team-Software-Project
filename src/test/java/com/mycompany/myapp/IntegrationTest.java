package com.mycompany.myapp;

import com.mycompany.myapp.TestApp;
import com.mycompany.myapp.config.AsyncSyncConfiguration;
import com.mycompany.myapp.config.EmbeddedElasticsearch;
import com.mycompany.myapp.config.EmbeddedKafka;
import com.mycompany.myapp.config.EmbeddedRedis;
import com.mycompany.myapp.config.EmbeddedSQL;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { TestApp.class, AsyncSyncConfiguration.class })
@EmbeddedRedis
@EmbeddedElasticsearch
@EmbeddedSQL
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@EmbeddedKafka
public @interface IntegrationTest {
}
