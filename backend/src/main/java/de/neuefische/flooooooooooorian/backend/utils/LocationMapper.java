package de.neuefische.flooooooooooorian.backend.utils;

import de.neuefische.flooooooooooorian.backend.dto.LocationDto;
import de.neuefische.flooooooooooorian.backend.dto.PictureDto;
import de.neuefische.flooooooooooorian.backend.dto.UserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;

public class LocationMapper {

    public static LocationDto toLocationDto(Location location) {
        return LocationDto.builder()
                .owner(UserDto.builder()
                        .avatar_url(location.getOwner().getAvatar_url())
                        .full_name(location.getOwner().getFull_name())
                        .build())
                .creationDate(location.getCreationDate())
                .description(location.getDescription())
                .lat(location.getLat())
                .lng(location.getLng())
                .pictures(location.getPictures())
                .rating(location.getRating())
                .tags(location.getTags())
                .title(location.getTitle())
                .thumbnail(location.getThumbnail() != null ? PictureDto.builder()
                        .creationDate(location.getThumbnail().getCreationDate())
                        .url(location.getThumbnail().getUrl())
                        .owner(UserDto.builder()
                                .avatar_url(location.getOwner().getAvatar_url())
                                .full_name(location.getOwner().getFull_name())
                                .build())
                        .build() : null)
                .build();
    }
}
