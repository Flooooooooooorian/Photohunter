package de.neuefische.flooooooooooorian.backend.security.model;

import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailUser extends User {
    private String password;

    @Builder
    public EmailUser(String id, String email, String full_name,String avatar_url, String role, boolean enabled, String password) {
        super(id, email, full_name, avatar_url, role, enabled);
        this.password = password;
    }


}
