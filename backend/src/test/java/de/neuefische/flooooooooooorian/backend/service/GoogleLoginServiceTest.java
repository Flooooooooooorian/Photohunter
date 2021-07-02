package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.GoogleLoginConfig;
import de.neuefische.flooooooooooorian.backend.dto.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;

class GoogleLoginServiceTest {

    private final RestTemplate restTemplate = mock(RestTemplate.class);
    private final GoogleLoginConfig googleLoginConfig = mock(GoogleLoginConfig.class);
    private final UserService userService = mock(UserService.class);
    private final JwtUtilsService jwtUtilsService = mock(JwtUtilsService.class);

    private final GoogleLoginService googleLoginService = new GoogleLoginService(restTemplate, googleLoginConfig, userService, jwtUtilsService);

    @Test
    void loginWithGoogle() {
        String code = "google_code";

        when(googleLoginConfig.getClientId()).thenReturn("google_client_id");
        when(googleLoginConfig.getClientSecret()).thenReturn("google_client_secret");
        when(googleLoginConfig.getRedirectUri()).thenReturn("google_redirect_uri");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.set("code", code);
        map.set("client_id", googleLoginConfig.getClientId());
        map.set("client_secret", googleLoginConfig.getClientSecret());
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", googleLoginConfig.getRedirectUri());
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
        GoogleAccessTokenDto googleAccessTokenDto = GoogleAccessTokenDto.builder()
                .scope("scope")
                .token_type("bearer")
                .access_token("google_access_token")
                .expires_in("4684646")
                .refresh_token("google_refresh_token")
                .build();
        ResponseEntity<GoogleAccessTokenDto> responseEntity = new ResponseEntity<>(googleAccessTokenDto, HttpStatus.OK);
        when(restTemplate.exchange("https://oauth2.googleapis.com/token", HttpMethod.POST, httpEntity, GoogleAccessTokenDto.class)).thenReturn(responseEntity);


        headers = new HttpHeaders();
        headers.setBearerAuth(googleAccessTokenDto.getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        GoogleProfileDto googleProfileDto = GoogleProfileDto.builder()
                .verified_email(true)
                .picture("picture_url")
                .name("name")
                .given_name("given_name")
                .family_name("family_name")
                .email("testemail@gmail.com")
                .build();
        ResponseEntity<GoogleProfileDto> profileResponseEntity = new ResponseEntity<>(googleProfileDto, HttpStatus.OK);
        when(restTemplate.exchange("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", HttpMethod.GET, entity, GoogleProfileDto.class)).thenReturn(profileResponseEntity);

        User user = User.builder()
                .id("test_id")
                .enabled(googleProfileDto.isVerified_email())
                .full_name(googleProfileDto.getName())
                .role("User")
                .email(googleProfileDto.getEmail())
                .avatar_url(googleProfileDto.getPicture())
                .google_refresh_token(googleAccessTokenDto.getRefresh_token())
                .google_access_token(googleAccessTokenDto.getAccess_token())
                .build();
        when(userService.loginUserWithGoogle(googleProfileDto, googleAccessTokenDto)).thenReturn(user);

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("name", user.getFull_name());
        when(jwtUtilsService.createToken(claims, user.getEmail())).thenReturn("jwt_test_token");


        String actual_token = googleLoginService.loginWithGoogle("code");

        verify(restTemplate).exchange("https://oauth2.googleapis.com/token", HttpMethod.POST, httpEntity, GoogleAccessTokenDto.class);
        verify(restTemplate).exchange("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", HttpMethod.GET, entity, GoogleProfileDto.class);
        verify(userService).loginUserWithGoogle(googleProfileDto, googleAccessTokenDto);
        verify(jwtUtilsService).createToken(claims, user.getEmail());

        assertThat(actual_token, equalTo("jwt_test_token"));
    }
}