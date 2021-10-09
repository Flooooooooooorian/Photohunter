package de.neuefische.flooooooooooorian.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteDto {
    @NotEmpty
    private String id;
    private boolean status = true;
}
