package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.EmailConfig;
import de.neuefische.flooooooooooorian.backend.dto.EmailVerificationDto;
import de.neuefische.flooooooooooorian.backend.dto.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.CustomUserDetails;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilsService jwtUtilsService;
    private final AuthenticationManager authenticationManager;
    private final EmailConfig emailConfig;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtilsService jwtUtilsService, AuthenticationManager authenticationManager, EmailConfig emailConfig) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtilsService = jwtUtilsService;
        this.authenticationManager = authenticationManager;
        this.emailConfig = emailConfig;
    }

    public User registerUserByEmail(UserCreationDto userCreationDto) {
        if (!userRepository.existsUserByEmail(userCreationDto.getEmail())) {

            User emailUser = User.builder()
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
        if (userRepository.existsUserByEmail(googleProfileDto.getEmail())) {
            Optional<User> google_user = userRepository.findUserByEmail(googleProfileDto.getEmail());
            return google_user.get();
        } else {
            User google_user = User.builder()
                    .google_access_token(googleAccessTokenDto.getAccess_token())
                    .google_refresh_token(googleAccessTokenDto.getRefresh_token())
                    .avatar_url(googleProfileDto.getPicture())
                    .full_name(googleProfileDto.getName())
                    .email(googleProfileDto.getEmail())
                    .role("User")
                    .enabled(googleProfileDto.isVerified_email())
                    .build();
            return userRepository.save(google_user);
        }
    }

    public String login(UserLoginDto userLoginDto) {
        Authentication auth;
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());
            auth = authenticationManager.authenticate(usernamePasswordData);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad login data");
        }

        if (!((CustomUserDetails)auth.getPrincipal()).isEnabled()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Email not verified");
        }
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("name", ((CustomUserDetails)auth.getPrincipal()).getFullName());
        return jwtUtilsService.createToken(claims, auth.getName());
    }

    public void startEmailVerification(String email) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("info.photohunter@gmail.com");
            message.setTo(email);
            message.setSubject("Email Verification PhotoHunter");
            message.setText("Hallo \n" + "http://localhost:8080/user/email/" + jwtUtilsService.createToken(new HashMap<>(), email));
            emailConfig.getJavaMailSender().send(message);
    }

    public boolean verificateEmailToken(EmailVerificationDto emailVerificationDto, String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        User user = userOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        if (user.isEnabled()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Claims claims = jwtUtilsService.parseClaim(emailVerificationDto.getToken());
        if (!email.equals(claims.get("sub"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        user.setEnabled(true);
        userRepository.save(user);
        return true;
    }
}
