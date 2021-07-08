package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.dto.LocationDto;
import de.neuefische.flooooooooooorian.backend.dto.PictureDto;
import de.neuefische.flooooooooooorian.backend.dto.UserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.service.CloudinaryService;
import de.neuefische.flooooooooooorian.backend.service.LocationService;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import de.neuefische.flooooooooooorian.backend.utils.LocationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final UserService userService;
    private final LocationService locationService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public LocationController(UserService userService, LocationService locationService, CloudinaryService cloudinaryService) {
        this.userService = userService;
        this.locationService = locationService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public List<LocationDto> getLocations(@RequestParam Optional<Double> lat, @RequestParam Optional<Double> lng) {
        return locationService.getLocations(lat, lng).stream()
                .map((LocationMapper::toLocationDto))
                .collect(Collectors.toList());
    }

    @PostMapping
    public LocationDto createLocation(Principal principal, @RequestPart LocationCreationDto locationCreationDto, @RequestPart(value = "file") Optional<MultipartFile> thumbnail) throws IOException {
        User user = userService.findUserByEmail(principal.getName()).orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));
        if (thumbnail.isPresent()) {
            File fileToUpload = File.createTempFile("photo", null);
            thumbnail.get().transferTo(fileToUpload);
            Picture photoToSave = cloudinaryService.uploadImage(fileToUpload);
            return LocationMapper.toLocationDto(locationService.createLocation(locationCreationDto, photoToSave, user));
        }
        return LocationMapper.toLocationDto(locationService.createLocation(locationCreationDto, user));
    }

    @GetMapping("/{id}")
    public LocationDto getLocationById(@PathVariable String id) {
        return LocationMapper.toLocationDto(locationService.getLocationById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id not valid!")));
    }
}
