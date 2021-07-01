package de.neuefische.flooooooooooorian.backend.security.model;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoogleUser extends User{
    private String access_token;
    private String refresh_token;

    @Builder
    public GoogleUser(String id, String email, String full_name, String avatar_url, String role, boolean enabled, String access_token, String refresh_token) {
        super(id, email, full_name, avatar_url, role, enabled);
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    @Override
    public String getPassword() {
        return null;
    }
}
