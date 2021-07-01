package de.neuefische.flooooooooooorian.backend.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@ConfigurationProperties(prefix = "google.oauth")
@AllArgsConstructor
@NoArgsConstructor
public class GoogleLoginConfig {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
}
