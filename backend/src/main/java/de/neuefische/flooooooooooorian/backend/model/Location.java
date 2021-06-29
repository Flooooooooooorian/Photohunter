package de.neuefische.flooooooooooorian.backend.model;

import de.neuefische.flooooooooooorian.backend.security.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "locations")
@Builder
public class Location {
    @Id
    private String id;
    private Instant creationDate;
    private User owner;
    private String g_placesId;
    private double lat;
    private double lng;
    private String title;
    private Picture thumbnail;
    private String description;
    private List<String> pictures;
    private double rating;
    private List<Tag> tags;
}
