package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.EmailDto;
import de.neuefische.flooooooooooorian.backend.dto.EmailVerificationDto;
import de.neuefische.flooooooooooorian.backend.dto.PasswordResetDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
