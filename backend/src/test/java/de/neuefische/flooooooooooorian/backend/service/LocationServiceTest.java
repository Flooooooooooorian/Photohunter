package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class LocationServiceTest {

    private final LocationRepository locationRepository = mock(LocationRepository.class);
    private final LocationService locationService = new LocationService(locationRepository);

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
}
