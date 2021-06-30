package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.service.UserSecurityService;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginDto userLoginDto) {
        return userService.login(userLoginDto);
    }

    @GetMapping("/profile")
    public Object getOwnProfile(Principal principal) {
        return principal;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody UserCreationDto userCreationDto) {
        return userService.registerUser(userCreationDto);
    }
}
