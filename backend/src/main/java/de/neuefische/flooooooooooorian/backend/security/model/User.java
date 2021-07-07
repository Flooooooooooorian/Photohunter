package de.neuefische.flooooooooooorian.backend.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    private String id;
    private String email;
    private String full_name;
    private String avatar_url;

    private String password;

    private String role;
    private boolean enabled;

    private String google_access_token;
    private String google_refresh_token;

}
