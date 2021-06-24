package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.LocationCreationDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.LocationRepository;
import de.neuefische.flooooooooooorian.backend.repository.PictureRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class LocationServiceTest {

    private final PictureRepository pictureRepository = mock(PictureRepository.class);
    private final PictureService pictureService = new PictureService(pictureRepository);

    private final LocationRepository locationRepository = mock(LocationRepository.class);
    private final LocationService locationService = new LocationService(locationRepository, pictureService);

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
    void createBasicLocationTest() {
        LocationCreationDto dto = LocationCreationDto.builder()
                .lat(50.0)
                .lng(15)
                .description("description l1")
                .title("title")
                .build();

        Picture p1 = Picture.builder()
                .id("feraegdarg")
                .url("www.url1.com")
                .build();

        Location newlocation = Location.builder()
                .lat(dto.getLat())
                .lng(dto.getLng())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .thumbnail(pictureService.createPicture(p1))
                .build();

        Location expected = Location.builder()
                .lat(dto.getLat())
                .lng(dto.getLng())
                .id("fdiuasdgiaffgdg")
                .title(dto.getTitle())
                .description(dto.getDescription())
                .thumbnail(pictureService.createPicture(p1))
                .build();

        when(locationRepository.save(newlocation)).thenReturn(expected);

        Location actual = locationService.createLocation(dto, p1);

        assertThat(actual, is(expected));
        verify(locationRepository).save(newlocation);
    }
}
