package de.neuefische.flooooooooooorian.backend;

import de.neuefische.flooooooooooorian.backend.model.Location;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends PagingAndSortingRepository<Location, String> {

    List<Location> findAll();
}
