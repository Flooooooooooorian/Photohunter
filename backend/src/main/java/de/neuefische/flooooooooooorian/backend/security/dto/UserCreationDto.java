package de.neuefische.flooooooooooorian.backend.security.dto;

import de.neuefische.flooooooooooorian.backend.security.validation.ValidPassword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationDto {
    @Email(message = "Email not valid")
    private String email;
    @NotEmpty(message = "Password is required")
    @ValidPassword
    private String password;
    @NotEmpty(message = "Name is required")
    private String name;
}
