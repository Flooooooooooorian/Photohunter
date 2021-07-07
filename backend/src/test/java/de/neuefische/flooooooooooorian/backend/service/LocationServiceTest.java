package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class LocationServiceTest {

    private final PictureService pictureService = mock(PictureService.class);

    private final LocationRepository locationRepository = mock(LocationRepository.class);
    private final LocationService locationService = new LocationService(locationRepository, pictureService);

    private final UserService userService = mock(UserService.class);

    @Test
    void getBasicLocationsList() {
        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(Picture.builder()
                        .id("feraegdarg")
                        .url("www.url1.com")
                        .build())
                .build();
        Location l2 = Location.builder()
                .lat(10.46484)
                .lng(1.648)
                .id("fsdfnaldgadgd")
                .description("description l2")
                .title("title")
                .thumbnail(Picture.builder()
                        .id("sdofs")
                        .url("www.url2.com")
                        .build())
                .build();

        when(locationRepository.findAll()).thenReturn(List.of(l1, l2));

        List<Location> actual = locationService.getLocations();

        assertThat(actual, containsInAnyOrder(l1, l2));
        verify(locationRepository).findAll();
    }

    @Test
    void getLocationById() {
        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(Picture.builder()
                        .id("feraegdarg")
                        .url("www.url1.com")
                        .build())
                .build();

        when(locationRepository.findById(l1.getId())).thenReturn(Optional.of(l1));

        Optional<Location> actual = locationService.getLocationById(l1.getId());

        assertThat(actual.isPresent(), is(true));
        assertThat(actual.get(), is(l1));
        verify(locationRepository).findById(l1.getId());
    }

    @Test
    void getLocationsWithGeoLocation() {
        Location l1 = Location.builder()
                .lat(50.0)
                .lng(15)
                .id("dsfdsfg4eyt")
                .description("description l1")
                .title("title")
                .thumbnail(Picture.builder()
                        .id("feraegdarg")
                        .url("www.url1.com")
                        .build())
                .build();

        when(locationRepository.findAllByLatBetweenAndLngBetween(45.0, 55.0, 13.0, 23.0)).thenReturn(List.of(l1));

        List<Location> actual = locationService.getLocations(Optional.of(50.0), Optional.of(18.0));

        assertThat(actual, containsInAnyOrder(l1));
        verify(locationRepository).findAllByLatBetweenAndLngBetween(45.0, 55.0, 13.0, 23.0);
    }

    @Test
    void createBasicLocationTest() {
        User user = User.builder()
                .email("test@test.com")
                .enabled(true)
                .password("password")
                .full_name("name")
                .avatar_url("avatar_url")
                .google_access_token("google_access_token")
                .google_refresh_token("google_refresh_token")
        .build();

        LocationCreationDto dto = LocationCreationDto.builder()
                .lat(50.0)
                .lng(15)
                .description("description l1")
                .title("title")
                .build();

        Picture p1dto = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .build();

        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .owner(user)
                .build();

        when(pictureService.createPicture(p1dto, user)).thenReturn(p1);

        Location newlocation = Location.builder()
                .lat(dto.getLat())
                .lng(dto.getLng())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .owner(user)
                .thumbnail(p1)
                .build();

        Location expected = Location.builder()
                .lat(dto.getLat())
                .lng(dto.getLng())
                .id("fdiuasdgiaffgdg")
                .title(dto.getTitle())
                .description(dto.getDescription())
                .thumbnail(p1)
                .build();

        when(locationRepository.save(any())).thenReturn(expected);

        Location actual = locationService.createLocation(dto, p1dto, user);

        verify(locationRepository).save(any());
        verify(pictureService, atLeastOnce()).createPicture(p1dto, user);
        assertThat(actual, is(expected));
    }
}
