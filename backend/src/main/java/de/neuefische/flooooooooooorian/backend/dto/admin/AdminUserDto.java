package de.neuefische.flooooooooooorian.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminUserDto {

    private String id;
    private Instant joinedOn;
    private String email;
    private String full_name;
    private String avatar_url;

    private String role;
    private boolean enabled;

    private String google_access_token;
    private String google_refresh_token;
}
