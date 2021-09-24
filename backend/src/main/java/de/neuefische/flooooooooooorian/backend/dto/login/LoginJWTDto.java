package de.neuefische.flooooooooooorian.backend.dto.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginJWTDto {
    private String jwt;
    private String[] authorities;
}
