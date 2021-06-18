package de.neuefische.flooooooooooorian.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
@Builder
public class Comment {
    @Id
    private String id;
    private String location_id;
    private User owner;
    private Instant posted_on;
}
