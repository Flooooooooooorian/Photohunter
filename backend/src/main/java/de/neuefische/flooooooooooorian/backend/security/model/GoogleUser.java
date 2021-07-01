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
    public GoogleUser(String id, String email, String full_name, boolean enabled, String access_token, String refresh_token) {
        super(id, email, full_name, enabled);
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    @Override
    public String getPassword() {
        return null;
    }
}
