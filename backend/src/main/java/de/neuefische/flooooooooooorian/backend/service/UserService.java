package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.EmailConfig;
import de.neuefische.flooooooooooorian.backend.dto.login.EmailVerificationDto;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.dto.login.PasswordResetDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.dto.user.ProfileDto;
import de.neuefische.flooooooooooorian.backend.dto.user.UserDto;
import de.neuefische.flooooooooooorian.backend.model.Location;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.CustomUserDetails;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import de.neuefische.flooooooooooorian.backend.utils.LocationMapper;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtilsService jwtUtilsService;
    private final AuthenticationManager authenticationManager;
    private final LocationService locationService;
    private final EmailConfig emailConfig;
    @Value("${domain_name:}")
    private String domain_name;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtilsService jwtUtilsService, AuthenticationManager authenticationManager, LocationService locationService, EmailConfig emailConfig) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtilsService = jwtUtilsService;
        this.authenticationManager = authenticationManager;
        this.locationService = locationService;
        this.emailConfig = emailConfig;
    }

    public User registerUserByEmail(UserCreationDto userCreationDto) {
        if (!userRepository.existsUserByEmail(userCreationDto.getEmail())) {

            User emailUser = User.builder()
                    .email(userCreationDto.getEmail())
                    .full_name(userCreationDto.getName())
                    .role("User")
                    .joinedOn(Instant.now())
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
                    .joinedOn(Instant.now())
                    .role("User")
                    .enabled(googleProfileDto.isVerified_email())
                    .build();
            return userRepository.save(google_user);
        }
    }

    public LoginJWTDto login(UserLoginDto userLoginDto) {
        Authentication auth;
        try {
            UsernamePasswordAuthenticationToken usernamePasswordData = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());
            auth = authenticationManager.authenticate(usernamePasswordData);

        }
        catch (DisabledException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not verified");
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Credentials");
        }
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("name", ((CustomUserDetails)auth.getPrincipal()).getFullName());
        return LoginJWTDto.builder()
                .authorities(auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toArray(String[]::new))
                .jwt(jwtUtilsService.createToken(claims, auth.getName()))
                .build();
    }

    public void startEmailVerification(String email) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("info.photohunter@gmail.com");
            message.setTo(email);
            message.setSubject("Email Verification PhotoHunter");
            message.setText("Hallo \n" + domain_name + "/email/?token=" + jwtUtilsService.createToken(new HashMap<>(), email));
            emailConfig.getJavaMailSender().send(message);
    }

    public boolean verificateEmailToken(EmailVerificationDto emailVerificationDto) {
        Claims claims = jwtUtilsService.parseClaim(emailVerificationDto.getToken());
        Optional<User> optionalUser = userRepository.findUserByEmail(claims.getSubject());
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        if (user.isEnabled()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already verified");
        }
        user.setEnabled(true);
        userRepository.save(user);
        return true;
    }

    public void sendPasswordResetEmail(String email) {
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        User user = userOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("info.photohunter@gmail.com");
        message.setTo(email);
        message.setSubject("Password Reset PhotoHunter");
        message.setText("Hallo \n" + domain_name + "/password/?token=" + jwtUtilsService.createPasswordResetToken(new HashMap<>(), user));
        emailConfig.getJavaMailSender().send(message);
    }

    public boolean resetPassword(PasswordResetDto passwordResetDto) {
        Optional<User> optionalUser = userRepository.findUserByEmail(passwordResetDto.getEmail());
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        jwtUtilsService.parseClaimsForPasswordResetToken(passwordResetDto.getToken(), user);

        user.setPassword(passwordEncoder.encode(passwordResetDto.getPassword()));
        userRepository.save(user);
        return true;
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public ProfileDto getProfile(String email) {
        Optional<User> optionalUser = userRepository.findUserByEmail(email);
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        List<Location> locations = locationService.getLocationsFromUser(user);

        return ProfileDto.builder()
                .user(UserDto.builder()
                        .avatar_url(user.getAvatar_url())
                        .full_name(user.getFull_name())
                        .build())
                .locations(locations.stream().map(LocationMapper::toLocationDto).collect(Collectors.toList()))
                .build();
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }
}
