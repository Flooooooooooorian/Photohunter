package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.location.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.dto.location.LocationDto;
import de.neuefische.flooooooooooorian.backend.dto.PictureDto;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.dto.user.UserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.repository.PictureRepository;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.service.CloudinaryService;
import de.neuefische.flooooooooooorian.backend.utils.LocationMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.File;
import java.io.IOException;
import java.time.Instant;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "jwt.secret=testSecret")
class LocationControllerTest {

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

    @Autowired
    private PictureRepository pictureRepository;

    @MockBean
    private CloudinaryService cloudinaryService;

    @BeforeEach
    public void clearDb() {
        locationRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void getBasicLocationsControllerIntegrationTest() {
        User user = User.builder()
                .enabled(true)
                .full_name("test")
                .avatar_url("avatar")
                .email("test_email")
                .role("User")
                .build();

        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .owner(user)
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .owner(user)
                .build();


        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .owner(user)
                .build();

        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(p2)
                .owner(user)
                .build();

        userRepository.save(user);
        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<LocationDto[]> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location", LocationDto[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody(), arrayContainingInAnyOrder(LocationMapper.toLocationDto(l1), LocationMapper.toLocationDto(l2)));
    }

    @Test
    void getBasicLocationByIdControllerIntegrationTest() {
        User user = User.builder()
                .enabled(true)
                .full_name("test")
                .avatar_url("avatar")
                .email("test_email")
                .role("User")
                .build();

        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .owner(user)
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .owner(user)
                .build();

        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .owner(user)
                .build();

        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .owner(user)
                .thumbnail(p2)
                .build();

        userRepository.save(user);
        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<LocationDto> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location/" + l2.getId(), LocationDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody(), is(LocationMapper.toLocationDto(l2)));
    }

    @Test
    void getLocationsWithGeoLocation() {
        User user = User.builder()
                .enabled(true)
                .full_name("test")
                .avatar_url("avatar")
                .email("test_email")
                .role("User")
                .build();

        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .owner(user)
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .owner(user)
                .build();

        Location l1 = Location.builder()
                .lat(50.0)
                .lng(48)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .owner(user)
                .build();

        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(p2)
                .owner(user)
                .build();

        userRepository.save(user);
        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<LocationDto[]> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location?lat=50&lng=50", LocationDto[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), arrayContainingInAnyOrder(LocationMapper.toLocationDto(l1)));
    }

    @Test
    void createBasicLocationControllerIntegrationTest() throws IOException {
        Picture picture = Picture.builder().url("testurl").id("fsfsdf").build();

        when(cloudinaryService.uploadImage(Mockito.any(File.class))).thenReturn(picture);

        LocationCreationDto dto = LocationCreationDto.builder()
                .lat(50.0)
                .lng(15)
                .description("description l1")
                .title("title")
                .build();

        HttpHeaders headers = getHttpHeaderWithAuthToken();
        headers.setContentType(MediaType.MULTIPART_MIXED);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("locationCreationDto", dto);
        body.add("file", new ClassPathResource("test_img.jpg"));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<LocationDto> response = testRestTemplate.exchange("http://localhost:" + port + "/api/location/", HttpMethod.POST, requestEntity, LocationDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody().getOwner(), notNullValue());
        assertThat(response.getBody().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody().getThumbnail().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getThumbnail().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody(), is(LocationDto
                .builder()
                .creationDate(response.getBody().getCreationDate())
                .lat(dto.getLat())
                .lng(dto.getLng())
                .title(dto.getTitle())
                .owner(response.getBody().getOwner())
                .thumbnail(PictureDto.builder().creationDate(response.getBody().getThumbnail().getCreationDate()).owner(response.getBody().getThumbnail().getOwner()).url("testurl").build())
                .description(dto.getDescription())
                .build()));
    }

    @Test
    void createBasicLocationWithoutThumbnailControllerIntegrationTest() {
        LocationCreationDto dto = LocationCreationDto.builder()
                .lat(50.0)
                .lng(15)
                .description("description l1")
                .title("title")
                .build();

        HttpHeaders headers = getHttpHeaderWithAuthToken();
        headers.setContentType(MediaType.MULTIPART_MIXED);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("locationCreationDto", dto);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<LocationDto> response = testRestTemplate.exchange("http://localhost:" + port + "/api/location/", HttpMethod.POST, requestEntity, LocationDto.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody().getOwner(), notNullValue());
        assertThat(response.getBody().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody(), is(LocationDto.builder()
                .lng(dto.getLng())
                .lat(dto.getLat())
                .creationDate(response.getBody().getCreationDate())
                .description(dto.getDescription())
                .title(dto.getTitle())
                .owner(UserDto.builder()
                        .build())
                .build()));
    }

    private HttpHeaders getHttpHeaderWithAuthToken() {
        userRepository.save(User.builder().enabled(true).email("test_email").role("User").password(passwordEncoder.encode("test_password")).build());
        UserLoginDto loginData = new UserLoginDto("test_email", "test_password");
        ResponseEntity<LoginJWTDto> tokenResponse = testRestTemplate.postForEntity("http://localhost:" + port + "/user/login", loginData, LoginJWTDto.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenResponse.getBody().getJwt());
        return headers;
    }
}
