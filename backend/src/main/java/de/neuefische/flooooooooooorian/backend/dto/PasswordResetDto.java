package de.neuefische.flooooooooooorian.backend.dto;

import de.neuefische.flooooooooooorian.backend.security.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetDto {
    @NotEmpty
    private String email;
    @ValidPassword
    private String password;
    @NotEmpty
    private String token;
}
