package de.neuefische.flooooooooooorian.backend.service;

import com.cloudinary.Cloudinary;
import de.neuefische.flooooooooooorian.backend.model.Picture;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary = new Cloudinary();

    public Picture uploadImage(File image) throws IOException {
        Map response = cloudinary.uploader().upload(image, Map.of());
        String url = response.get("url").toString();
        String public_id = response.get("public_id").toString();
        return Picture.builder().id(public_id).url(url).build();
    }
}
