package de.neuefische.flooooooooooorian.backend.utils;

import de.neuefische.flooooooooooorian.backend.dto.location.LocationDto;
import de.neuefische.flooooooooooorian.backend.dto.PictureDto;
import de.neuefische.flooooooooooorian.backend.dto.user.UserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.security.model.User;

import java.util.Optional;

public class LocationMapper {

    public static LocationDto toLocationDto(Location location, Optional<User> optionalUser) {
        return LocationDto.builder()
                .owner(UserDto.builder()
                        .avatar_url(location.getOwner().getAvatar_url())
                        .full_name(location.getOwner().getFull_name())
                        .build())
                .favorite(optionalUser.isPresent() && optionalUser.get().getFavoriteLocationIds().contains(location.getId()))
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
