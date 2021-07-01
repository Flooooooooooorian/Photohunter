package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.CustomUserDetails;
import de.neuefische.flooooooooooorian.backend.security.model.EmailUser;
import de.neuefische.flooooooooooorian.backend.security.model.GoogleUser;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilsService jwtUtilsService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtilsService jwtUtilsService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtilsService = jwtUtilsService;
        this.authenticationManager = authenticationManager;
    }

    public User registerUserByEmail(UserCreationDto userCreationDto) {
        if (!userRepository.existsUserByEmail(userCreationDto.getEmail())) {

            EmailUser emailUser = EmailUser.builder()
                    .email(userCreationDto.getEmail())
                    .full_name(userCreationDto.getName())
                    .role("User")
                    .password(passwordEncoder.encode(userCreationDto.getPassword()))
                    .build();

            return userRepository.save(emailUser);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
    }

    public User loginUserWithGoogle(GoogleProfileDto googleProfileDto, GoogleAccessTokenDto googleAccessTokenDto) {
        if (existsUserByUsername(googleProfileDto.getEmail())) {
            Optional<User> google_user = findUserByEmail(googleProfileDto.getEmail());
            return google_user.get();
        } else {
            GoogleUser new_google_user = GoogleUser.builder()
                    .access_token(googleAccessTokenDto.getAccess_token())
                    .refresh_token(googleAccessTokenDto.getRefresh_token())
                    .avatar_url(googleProfileDto.getPicture())
                    .full_name(googleProfileDto.getName())
                    .email(googleProfileDto.getEmail())
                    .role("User")
                    .enabled(googleProfileDto.isVerified_email())
                    .build();
            return userRepository.save(new_google_user);
        }
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public boolean existsUserByUsername(String email) {
        return userRepository.existsUserByEmail(email);
    }

    public String login(UserLoginDto userLoginDto) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());
            Authentication auth = authenticationManager.authenticate(usernamePasswordData);
            System.out.println(auth);
            HashMap<String, Object> claims = new HashMap<>();
            claims.put("name", ((CustomUserDetails)auth.getPrincipal()).getFullName());
            return jwtUtilsService.createToken(claims, auth.getName());

        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }
    }
}
