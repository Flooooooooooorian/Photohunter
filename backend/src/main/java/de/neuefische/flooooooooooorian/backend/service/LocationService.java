package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getLocations(Optional<Double> lat, Optional<Double> lng) {
        if (lat.isPresent() && lng.isPresent()) {
            return locationRepository.findAllByLatBetweenAndLngBetween(lat.get() - 50, lat.get() + 50, lng.get() - 50, lng.get() + 50);
        }
        return this.getLocations();
    }

    public Optional<Location> getLocationById(String id) {
        return locationRepository.findById(id);
    }
}
