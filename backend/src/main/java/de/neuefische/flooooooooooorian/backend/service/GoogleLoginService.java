package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.GoogleLoginConfig;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@Service
public class GoogleLoginService {

    private final RestTemplate restTemplate;
    private final GoogleLoginConfig googleLoginConfig;
    private final UserService userService;
    private final JwtUtilsService jwtUtilsService;

    @Autowired
    public GoogleLoginService(RestTemplate restTemplate, GoogleLoginConfig googleLoginConfig, UserService userService, JwtUtilsService jwtUtilsService) {
        this.restTemplate = restTemplate;
        this.googleLoginConfig = googleLoginConfig;
        this.userService = userService;
        this.jwtUtilsService = jwtUtilsService;
    }

    public String loginWithGoogle(String code) {
        GoogleAccessTokenDto googleAccessTokenDto = getAccessToken(code);
        GoogleProfileDto profile = getGoogleProfileInformations(googleAccessTokenDto.getAccess_token());
        User google_user = getUserWithGoogleProfile(profile, googleAccessTokenDto);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("name", google_user.getFull_name());

        return jwtUtilsService.createToken(claims, google_user.getEmail());
    }

    private User getUserWithGoogleProfile(GoogleProfileDto profile, GoogleAccessTokenDto googleAccessTokenDto) {
        return userService.loginUserWithGoogle(profile, googleAccessTokenDto);
    }

    private GoogleAccessTokenDto getAccessToken(String code) {
        String url = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.set("code", code);
        map.set("client_id", googleLoginConfig.getClientId());
        map.set("client_secret", googleLoginConfig.getClientSecret());
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", googleLoginConfig.getRedirectUri());

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
        ResponseEntity<GoogleAccessTokenDto> responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, GoogleAccessTokenDto.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    private GoogleProfileDto getGoogleProfileInformations(String access_token) {
        String url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(access_token);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<GoogleProfileDto> response = restTemplate.exchange(url, HttpMethod.GET, entity, GoogleProfileDto.class);

        return response.getBody();
    }
}
