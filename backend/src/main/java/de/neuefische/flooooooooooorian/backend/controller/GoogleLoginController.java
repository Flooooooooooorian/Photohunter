package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.config.GoogleLoginConfig;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleCodeDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleLoginConfigDto;
import de.neuefische.flooooooooooorian.backend.service.GoogleLoginService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/google/login")
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;
    private final GoogleLoginConfig googleLoginConfig;

    public GoogleLoginController(GoogleLoginService googleLoginService, GoogleLoginConfig googleLoginConfig) {
        this.googleLoginService = googleLoginService;
        this.googleLoginConfig = googleLoginConfig;
    }

    @PostMapping
    public LoginJWTDto loginWithGoogle(@RequestBody GoogleCodeDto code) {
        return googleLoginService.loginWithGoogle(code.getCode());
    }

    @GetMapping("/config")
    public GoogleLoginConfigDto getGoogleLoginConfig() {
        return GoogleLoginConfigDto.builder()
                .clientId(googleLoginConfig.getClientId())
                .redirectUri(googleLoginConfig.getRedirectUri()).build();
    }
}
