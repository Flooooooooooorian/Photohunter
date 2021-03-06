package de.neuefische.flooooooooooorian.backend.dto;

import de.neuefische.flooooooooooorian.backend.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PictureDto {
    private String url;
    private UserDto owner;
    private Instant creationDate;
}
