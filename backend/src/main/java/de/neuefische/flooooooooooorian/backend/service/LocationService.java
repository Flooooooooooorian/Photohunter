package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final PictureService pictureService;

    @Autowired
    public LocationService(LocationRepository locationRepository, PictureService pictureService) {
        this.locationRepository = locationRepository;
        this.pictureService = pictureService;
    }

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getLocations(Optional<Double> lat, Optional<Double> lng) {
        if (lat.isPresent() && lng.isPresent()) {
            return locationRepository.findAllByLatBetweenAndLngBetween((lat.get() - 5), (lat.get() + 5), (lng.get() - 5), (lng.get() + 5));
        }
        return this.getLocations();
    }

    public Location createLocation(LocationCreationDto locationCreationDto, User user) {

        return this.createLocation(locationCreationDto, null, user);
    }

    public Location createLocation(LocationCreationDto locationCreationDto, Picture picture, User user) {

        Location location = Location.builder()
                .creationDate(Instant.now())
                .lat(locationCreationDto.getLat())
                .lng(locationCreationDto.getLng())
                .title(locationCreationDto.getTitle())
                .description(locationCreationDto.getDescription())
                .owner(user)
                .build();

        if (picture != null) {
            location.setThumbnail(pictureService.createPicture(picture, user));
        }

        return locationRepository.save(location);
    }

    public Optional<Location> getLocationById(String id) {
        return locationRepository.findById(id);
    }

    public List<Location> getLocationsFromUser(User user) {
        return locationRepository.findAllByOwner(user);
    }
}
