package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.model.Picture;
import de.neuefische.flooooooooooorian.backend.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PictureService {

    private final PictureRepository pictureRepository;

    @Autowired
    public PictureService(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    public Picture createPicture(Picture picture, User user) {
        picture.setOwner(user);
        picture.setCreationDate(Instant.now());
        return pictureRepository.save(picture);
    }
}
