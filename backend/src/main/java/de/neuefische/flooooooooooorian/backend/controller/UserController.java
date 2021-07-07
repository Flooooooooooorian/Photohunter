package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.*;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public UserDto registerUser(@Valid @RequestBody UserCreationDto userCreationDto) {
        User user = userService.registerUserByEmail(userCreationDto);
        userService.startEmailVerification(user.getEmail());
        return UserDto.builder().email(user.getEmail()).full_name(user.getFull_name()).avatar_url(user.getAvatar_url()).build();
    }

    @PostMapping("/email")
    public boolean verificateEmail(@RequestBody @Valid EmailVerificationDto emailVerificationDto) {
        return userService.verificateEmailToken(emailVerificationDto);
    }

    @PostMapping("/sendemailvarification")
    public void sendEmailVerification(@RequestBody @Valid EmailDto sendEmailVerificationDto) {
        userService.startEmailVerification(sendEmailVerificationDto.getEmail());
    }

    @PostMapping("/sendpasswordreset")
    public void sendPasswordResetEmail(@RequestBody @Valid EmailDto emailDto) {
        userService.sendPasswordResetEmail(emailDto.getEmail());
    }

    @PostMapping("/passwordreset")
    public boolean resetPassword(@RequestBody @Valid PasswordResetDto passwordDto) {
        return userService.resetPassword(passwordDto);
    }
}
