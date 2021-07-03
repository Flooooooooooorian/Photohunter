package de.neuefische.flooooooooooorian.backend.model;

import de.neuefische.flooooooooooorian.backend.security.model.User;
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
@Document(collection = "pictures")
@Builder
public class Picture {
    @Id
    private String id;
    private String url;
    private User owner;
    private Instant creationDate;
}
