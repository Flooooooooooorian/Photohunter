package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.EmailVerificationDto;
import de.neuefische.flooooooooooorian.backend.dto.SendEmailVerificationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody UserCreationDto userCreationDto) {
        return userService.registerUserByEmail(userCreationDto);
    }

    @PostMapping("/email")
    public boolean verificateEmail(Principal principal, @RequestBody @Valid EmailVerificationDto emailVerificationDto) {
        return userService.verificateEmailToken(emailVerificationDto, principal.getName());
    }

    @PostMapping("/sendemail")
    public void sendEmailVerification(@RequestBody @Valid SendEmailVerificationDto sendEmailVerificationDto) {
        userService.startEmailVerification(sendEmailVerificationDto.getEmail());
    }
}
