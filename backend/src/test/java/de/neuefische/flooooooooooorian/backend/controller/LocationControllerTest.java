package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.repository.PictureRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LocationControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private PictureRepository pictureRepository;

    @BeforeEach
    public void clearDb() {
        locationRepository.deleteAll();
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
}
