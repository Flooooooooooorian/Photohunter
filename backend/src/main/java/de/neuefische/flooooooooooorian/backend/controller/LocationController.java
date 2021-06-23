package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable String id) {
        return locationService.getLocationById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not valid!"));
    }
}
