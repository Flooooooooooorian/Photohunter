package de.neuefische.flooooooooooorian.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailVerificationDto {
    @NotEmpty
    private String email;
    @NotEmpty
    private String token;
}
