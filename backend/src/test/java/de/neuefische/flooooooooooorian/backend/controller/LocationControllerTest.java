package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.repository.PictureRepository;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.service.CloudinaryService;
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
import java.time.temporal.TemporalAmount;

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
        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .build();


        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .build();
        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(p2)
                .build();

        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<Location[]> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location", Location[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody(), arrayContainingInAnyOrder(l1, l2));
    }

    @Test
    void getBasicLocationByIdControllerIntegrationTest() {
        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .build();


        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .build();
        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(p2)
                .build();

        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<Location> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location/" + l2.getId(), Location.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody(), is(l2));
    }

    @Test
    void getLocationsWithGeoLocation() {
        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .build();

        Picture p2 = Picture.builder()
                .id("sdofs")
                .url("www.url2.com")
                .build();


        Location l1 = Location.builder()
                .lat(50.0)
                .lng(48)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(p1)
                .build();
        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(p2)
                .build();

        pictureRepository.save(p1);
        pictureRepository.save(p2);
        locationRepository.save(l1);
        locationRepository.save(l2);

        ResponseEntity<Location[]> response = testRestTemplate.getForEntity("http://localhost:" + port + "/api/location?lat=50&lng=50", Location[].class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), arrayContainingInAnyOrder(l1));
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

        ResponseEntity<Location> response = testRestTemplate.exchange("http://localhost:" + port + "/api/location/", HttpMethod.POST, requestEntity, Location.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getId(), notNullValue());
        assertThat(response.getBody().getThumbnail().getId(), notNullValue());
        assertThat(response.getBody().getOwner(), notNullValue());
        assertThat(response.getBody().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody().getThumbnail().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getThumbnail().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody(), is(Location
                .builder()
                .creationDate(response.getBody().getCreationDate())
                .id(response.getBody().getId())
                .lat(dto.getLat())
                .lng(dto.getLng())
                .title(dto.getTitle())
                .owner(response.getBody().getOwner())
                .thumbnail(Picture.builder().id(response.getBody().getThumbnail().getId()).creationDate(response.getBody().getThumbnail().getCreationDate()).owner(response.getBody().getThumbnail().getOwner()).url("testurl").build())
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

        ResponseEntity<Location> response = testRestTemplate.exchange("http://localhost:" + port + "/api/location/", HttpMethod.POST, requestEntity, Location.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody().getId(), notNullValue());
        assertThat(response.getBody().getOwner(), notNullValue());
        assertThat(response.getBody().getCreationDate().isBefore(Instant.now()), is(true));
        assertThat(response.getBody().getCreationDate().isAfter(Instant.now().minusSeconds(1)), is(true));
        assertThat(response.getBody(), is(Location
                .builder()
                .id(response.getBody().getId())
                .lat(dto.getLat())
                .lng(dto.getLng())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .creationDate(response.getBody().getCreationDate())
                .build()));
    }

    private HttpHeaders getHttpHeaderWithAuthToken() {
        User u = userRepository.save(User.builder().email("test_email").role("User").password(passwordEncoder.encode("test_password")).build());
        System.out.println(u);
        UserLoginDto loginData = new UserLoginDto("test_email", "test_password");
        ResponseEntity<String> tokenResponse = testRestTemplate.postForEntity("http://localhost:" + port + "/user/login", loginData, String.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(tokenResponse.getBody());
        System.out.println(tokenResponse.getBody());
        return headers;
    }
}
