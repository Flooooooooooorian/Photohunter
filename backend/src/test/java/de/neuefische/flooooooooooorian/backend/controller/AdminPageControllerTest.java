package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.admin.AdminUserDto;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.MultiValueMap;

import java.util.Objects;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "jwt.secret=testSecret")
class AdminPageControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void clearDb() {
        locationRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void getLocationsNormalUser() {
        HttpHeaders headers = getHttpHeaderWithUserAuthToken();

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/api/admin/locations/", HttpMethod.GET, requestEntity, String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    void getLocationsStaffUser() {
        HttpHeaders headers = getHttpHeaderWithStaffAuthToken();

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<Location[]> response = testRestTemplate.exchange("http://localhost:" + port + "/api/admin/locations/", HttpMethod.GET, requestEntity, Location[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    @Test
    void getUsersNormalUser() {
        HttpHeaders headers = getHttpHeaderWithUserAuthToken();

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/api/admin/users/", HttpMethod.GET, requestEntity, String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    void getUsersStaffUser() {
        HttpHeaders headers = getHttpHeaderWithStaffAuthToken();

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<AdminUserDto[]> response = testRestTemplate.exchange("http://localhost:" + port + "/api/admin/users/", HttpMethod.GET, requestEntity, AdminUserDto[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
    }

    private HttpHeaders getHttpHeaderWithUserAuthToken() {
        userRepository.save(User.builder().enabled(true).email("test_email").role("User").password(passwordEncoder.encode("test_password")).build());
        UserLoginDto loginData = new UserLoginDto("test_email", "test_password");
        ResponseEntity<LoginJWTDto> tokenResponse = testRestTemplate.postForEntity("http://localhost:" + port + "/user/login", loginData, LoginJWTDto.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(Objects.requireNonNull(tokenResponse.getBody()).getJwt());
        return headers;
    }

    private HttpHeaders getHttpHeaderWithStaffAuthToken() {
        userRepository.save(User.builder().enabled(true).email("test_email").role("Staff").password(passwordEncoder.encode("test_password")).build());
        UserLoginDto loginData = new UserLoginDto("test_email", "test_password");
        ResponseEntity<LoginJWTDto> tokenResponse = testRestTemplate.postForEntity("http://localhost:" + port + "/user/login", loginData, LoginJWTDto.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(Objects.requireNonNull(tokenResponse.getBody()).getJwt());
        return headers;
    }
}
