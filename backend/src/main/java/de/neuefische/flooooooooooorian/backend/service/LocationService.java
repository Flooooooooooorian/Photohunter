package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Location createLocation(LocationCreationDto locationCreationDto, Picture picture) {

        Location location = Location.builder()
                .lat(locationCreationDto.getLat())
                .lng(locationCreationDto.getLng())
                .title(locationCreationDto.getTitle())
                .description(locationCreationDto.getDescription())
                .thumbnail(pictureService.createPicture(picture))
                .build();

        return locationRepository.save(location);
    }
}
