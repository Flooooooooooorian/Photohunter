package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.service.CloudinaryService;
import de.neuefische.flooooooooooorian.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public LocationController(LocationService locationService, CloudinaryService cloudinaryService) {
        this.locationService = locationService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @PostMapping
    @ResponseBody
    public Location createLocation(@RequestPart LocationCreationDto locationCreationDto, @RequestPart(value = "file") MultipartFile thumbnail) throws IOException {
        File fileToUpload = File.createTempFile("photo", null);
        thumbnail.transferTo(fileToUpload);
        Picture photoToSave = cloudinaryService.uploadImage(fileToUpload);
        return locationService.createLocation(locationCreationDto, photoToSave);
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable String id) {
        Optional<Location> optionalLocation = locationService.getLocationById(id);
        if (optionalLocation.isPresent()){
            return optionalLocation.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not valid!");

    }
}
