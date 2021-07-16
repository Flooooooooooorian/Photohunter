package de.neuefische.flooooooooooorian.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDto {
    @NotEmpty
    private String id;
}
