package de.neuefische.flooooooooooorian.backend.security.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public abstract class User {

    @Id
    protected String id;
    protected String email;
    protected String full_name;

    protected boolean enabled;

    public abstract String getPassword();
}
