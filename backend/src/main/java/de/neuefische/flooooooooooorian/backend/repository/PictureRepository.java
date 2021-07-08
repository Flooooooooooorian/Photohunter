package de.neuefische.flooooooooooorian.backend.repository;

import de.neuefische.flooooooooooorian.backend.model.Picture;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureRepository extends PagingAndSortingRepository<Picture, String> {

}
