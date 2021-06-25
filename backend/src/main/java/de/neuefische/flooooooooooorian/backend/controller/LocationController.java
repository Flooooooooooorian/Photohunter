package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.service.CloudinaryService;
import de.neuefische.flooooooooooorian.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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
    public List<Location> getLocations(@RequestParam Optional<Double> lat, @RequestParam Optional<Double> lng) {
        return locationService.getLocations(lat, lng);
    }

    @PostMapping
    @ResponseBody
    public Location createLocation(@RequestPart LocationCreationDto locationCreationDto, @RequestPart(value = "file") Optional<MultipartFile> thumbnail) throws IOException {
        if (thumbnail.isPresent()) {
            File fileToUpload = File.createTempFile("photo", null);
            thumbnail.get().transferTo(fileToUpload);
            Picture photoToSave = cloudinaryService.uploadImage(fileToUpload);
            return locationService.createLocation(locationCreationDto, photoToSave);
        }
        return locationService.createLocation(locationCreationDto);
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable String id) {
        return locationService.getLocationById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not valid!"));
    }
}
