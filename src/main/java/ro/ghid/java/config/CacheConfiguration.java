package ro.ghid.java.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName() + ".postedRatings", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName() + ".postedComments", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName() + ".editRequests", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName() + ".wishlists", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserAccount.class.getName() + ".groups", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Objective.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Objective.class.getName() + ".ratings", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Objective.class.getName() + ".comments", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Objective.class.getName() + ".editRequests", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Rating.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Comment.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.City.class.getName() + ".objectives", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.Region.class.getName() + ".cities", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.EditRequest.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.ObjectiveWishList.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.ObjectiveWishList.class.getName() + ".objectives", jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserGroup.class.getName(), jcacheConfiguration);
            cm.createCache(ro.ghid.java.domain.UserGroup.class.getName() + ".users", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
