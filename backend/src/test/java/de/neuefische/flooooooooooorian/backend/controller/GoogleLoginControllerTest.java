package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.config.GoogleLoginConfig;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleCodeDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleLoginConfigDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"jwt.secret=testSecret",
        "google.oauth.clientId=google_client_id",
        "google.oauth.clientSecret=google_client_secret",
        "google.oauth.redirectUri=google_redirect_uri"})
class GoogleLoginControllerTest {

    @LocalServerPort
    private int port;

    @MockBean
    private RestTemplate restTemplate;

    @Autowired
    private GoogleLoginConfig googleLoginConfig;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtilsService jwtUtilsService;

    @BeforeEach
    public void clearDb() {
        userRepository.deleteAll();
    }

    @Test
    void loginValidWithGoogle() {
        GoogleCodeDto code = new GoogleCodeDto("valid_code");

        HttpHeaders token_headers = new HttpHeaders();
        token_headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.set("code", code.getCode());
        map.set("client_id", googleLoginConfig.getClientId());
        map.set("client_secret", googleLoginConfig.getClientSecret());
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", googleLoginConfig.getRedirectUri());
        GoogleAccessTokenDto googleAccessTokenDto = GoogleAccessTokenDto.builder()
                .scope("scope")
                .token_type("bearer")
                .access_token("google_access_token")
                .expires_in("4684646")
                .refresh_token("google_refresh_token")
                .build();
        when(restTemplate.exchange("https://oauth2.googleapis.com/token", HttpMethod.POST, new HttpEntity<>(map, token_headers), GoogleAccessTokenDto.class))
                .thenReturn(ResponseEntity.ok(googleAccessTokenDto));

        HttpHeaders userinfo_headers = new HttpHeaders();
        userinfo_headers.setBearerAuth(googleAccessTokenDto.getAccess_token());
        GoogleProfileDto googleProfileDto = GoogleProfileDto.builder()
                .verified_email(true)
                .picture("picture_url")
                .name("name")
                .given_name("given_name")
                .family_name("family_name")
                .email("testemail@gmail.com")
                .build();
        ResponseEntity<GoogleProfileDto> profileResponseEntity = new ResponseEntity<>(googleProfileDto, HttpStatus.OK);
        when(restTemplate.exchange("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", HttpMethod.GET, new HttpEntity<>(userinfo_headers), GoogleProfileDto.class)).thenReturn(profileResponseEntity);

        ResponseEntity<LoginJWTDto> response = testRestTemplate.exchange("http://localhost:" + port + "/auth/google/login", HttpMethod.POST, new HttpEntity<>(code), LoginJWTDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));

        try {
            jwtUtilsService.parseClaim(response.getBody().getJwt());
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            Assertions.fail(e.getMessage());
        }

        Assertions.fail();
    }

    @Test
    void loginNoValidCodeWithGoogle() {
        GoogleCodeDto code = new GoogleCodeDto("not_valid_code");

        HttpHeaders token_headers = new HttpHeaders();
        token_headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.set("code", code.getCode());
        map.set("client_id", googleLoginConfig.getClientId());
        map.set("client_secret", googleLoginConfig.getClientSecret());
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", googleLoginConfig.getRedirectUri());
        when(restTemplate.exchange("https://oauth2.googleapis.com/token", HttpMethod.POST, new HttpEntity<>(map, token_headers), GoogleAccessTokenDto.class))
                .thenReturn(ResponseEntity.badRequest().build());

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/auth/google/login", HttpMethod.POST, new HttpEntity<>(code), String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }

    @Test
    void testGoogleLoginConfigEndpoint() {
        ResponseEntity<GoogleLoginConfigDto> response = testRestTemplate.getForEntity("http://localhost:" + port + "/auth/google/login/config", GoogleLoginConfigDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getClientId(), is("google_client_id"));
        assertThat(response.getBody().getRedirectUri(), is("google_redirect_uri"));
    }
}
