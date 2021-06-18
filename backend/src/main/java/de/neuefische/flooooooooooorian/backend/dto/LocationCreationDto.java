package de.neuefische.flooooooooooorian.backend.dto;

import de.neuefische.flooooooooooorian.backend.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationCreationDto {
    private String title;
    private String description;
    private double lng;
    private double lat;
}
