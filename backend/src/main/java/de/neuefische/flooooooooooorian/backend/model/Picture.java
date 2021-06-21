package de.neuefische.flooooooooooorian.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
