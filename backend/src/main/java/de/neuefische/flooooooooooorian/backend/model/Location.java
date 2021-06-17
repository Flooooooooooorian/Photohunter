package de.neuefische.flooooooooooorian.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "locations")
@Builder
public class Location {
    @Id
    private String id;
    private Date creationDate;

    private User owner;

    private String g_placesId;

    private double lat;
    private double lng;

    private String title;
    private String thumbnail;
    private String description;
    private List<String> pictures;
    private double rating;

    private List<Tag> tags;
}
