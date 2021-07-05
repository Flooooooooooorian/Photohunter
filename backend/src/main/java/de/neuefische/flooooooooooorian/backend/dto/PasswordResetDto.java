package de.neuefische.flooooooooooorian.backend.dto;

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
    @NotEmpty
    private String password;
    @NotEmpty
    private String token;
}
