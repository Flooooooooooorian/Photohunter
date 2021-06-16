package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.LocationRepository;
import de.neuefische.flooooooooooorian.backend.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }
}
