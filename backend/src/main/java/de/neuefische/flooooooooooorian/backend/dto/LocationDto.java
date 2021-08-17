package de.neuefische.flooooooooooorian.backend.dto;

import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationDto {
    private String id;
    private Instant creationDate;
    private UserDto owner;
    private double lat;
    private double lng;
    private String title;
    private PictureDto thumbnail;
    private String description;
    private List<String> pictures;
    private double rating;
    private List<Tag> tags;
}
