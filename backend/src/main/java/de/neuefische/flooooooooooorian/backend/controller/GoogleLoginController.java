package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.GoogleCodeDto;
import de.neuefische.flooooooooooorian.backend.service.GoogleLoginService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth/google/login")
public class GoogleLoginController {

    private final GoogleLoginService googleLoginService;

    public GoogleLoginController(GoogleLoginService googleLoginService) {
        this.googleLoginService = googleLoginService;
    }

    @PostMapping
    public String loginWithGoogle(@RequestBody GoogleCodeDto code) {
        return googleLoginService.loginWithGoogle(code.getCode());
    }
}
