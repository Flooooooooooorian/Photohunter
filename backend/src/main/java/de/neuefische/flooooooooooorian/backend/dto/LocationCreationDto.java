package de.neuefische.flooooooooooorian.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationCreationDto {
    @NotEmpty
    @Size(max = 11)
    private String title;
    @NotEmpty
    private String description;
    private double lng;
    private double lat;
}
