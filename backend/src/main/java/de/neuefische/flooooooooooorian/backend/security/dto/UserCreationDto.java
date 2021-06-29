package de.neuefische.flooooooooooorian.backend.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationDto {
    private String email;
    private String password;
}
