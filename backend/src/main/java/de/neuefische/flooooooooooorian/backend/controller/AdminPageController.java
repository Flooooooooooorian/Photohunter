package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.admin.AdminUserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.service.LocationService;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminPageController {

    private final UserService userService;
    private final LocationService locationService;

    @Autowired
    public AdminPageController(UserService userService, LocationService locationService) {
        this.userService = userService;
        this.locationService = locationService;
    }

    @GetMapping()
    public List<String> getAdminPage() {
        return List.of("Users", "Locations");
    }

    @GetMapping("/locations")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @GetMapping("/users")
    public List<AdminUserDto> getUsers() {
        List<AdminUserDto> users = new ArrayList<>();
        userService.getUsers().forEach(user -> users.add(AdminUserDto.builder()
                .full_name(user.getFull_name())
                .avatar_url(user.getAvatar_url())
                .email(user.getEmail())
                .joinedOn(user.getJoinedOn())
                .enabled(user.isEnabled())
                .id(user.getId())
                .google_access_token(user.getGoogle_access_token())
                .google_refresh_token(user.getGoogle_refresh_token())
                .role(user.getRole())
                .build()));
        return users;
    }
}
