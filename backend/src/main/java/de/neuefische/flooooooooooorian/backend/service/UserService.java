package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserCreationDto userCreationDto) {
        if (!userRepository.existsUserByUsername(userCreationDto.getEmail())) {

            User newUser = new User(userCreationDto.getEmail(), passwordEncoder.encode(userCreationDto.getPassword()), false, List.of(new SimpleGrantedAuthority("User")));

            return userRepository.save(newUser);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
    }
}
