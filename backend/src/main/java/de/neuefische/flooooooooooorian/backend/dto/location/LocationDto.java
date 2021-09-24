package de.neuefische.flooooooooooorian.backend.dto.location;

import de.neuefische.flooooooooooorian.backend.dto.PictureDto;
import de.neuefische.flooooooooooorian.backend.dto.user.UserDto;
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
