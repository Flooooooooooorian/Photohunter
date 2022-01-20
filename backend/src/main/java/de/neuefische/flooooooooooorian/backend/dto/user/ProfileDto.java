package de.neuefische.flooooooooooorian.backend.dto.user;

import de.neuefische.flooooooooooorian.backend.dto.location.LocationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileDto {
    private UserDto user;
    private List<LocationDto> locations;
    private List<LocationDto> favorites;
}
