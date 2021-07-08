package de.neuefische.flooooooooooorian.backend.repository;

import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends PagingAndSortingRepository<Location, String> {

    List<Location> findAll();
    List<Location> findAllByLatBetweenAndLngBetween(double lat, double lat2, double lng, double lng2);

    List<Location> findAllByOwner(User owner);
    Location findById();
}
