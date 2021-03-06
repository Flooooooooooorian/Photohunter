package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.EmailConfig;
import de.neuefische.flooooooooooorian.backend.dto.login.LoginJWTDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleAccessTokenDto;
import de.neuefische.flooooooooooorian.backend.dto.login.google.GoogleProfileDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.CustomUserDetails;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.assertj.core.condition.AnyOf;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final JwtUtilsService jwtUtilsService = mock(JwtUtilsService.class);
    private final LocationService locationService = mock(LocationService.class);
    private final EmailConfig emailConfig = mock(EmailConfig.class);
    private final AuthenticationManager authenticationManager = mock(AuthenticationManager.class);

    private final UserService userService = new UserService(userRepository, passwordEncoder, jwtUtilsService, authenticationManager, locationService, emailConfig);

    @Test
    void registerNewUserByEmail() {
        UserCreationDto userCreationDto = new UserCreationDto("testemail@test.com", "test_password", "testname");

        User user = User.builder()
                .email(userCreationDto.getEmail())
                .full_name(userCreationDto.getName())
                .role("User")
                .password("encoded_password")
                .build();

        User userWithId = User.builder()
                .id("test_id")
                .email(userCreationDto.getEmail())
                .full_name(userCreationDto.getName())
                .role("User")
                .password("encoded_password")
                .build();


        when(userRepository.existsUserByEmail(userCreationDto.getEmail())).thenReturn(false);
        when(userRepository.save(Mockito.any(User.class))).thenReturn(userWithId);
        when(passwordEncoder.encode(userCreationDto.getPassword())).thenReturn("encoded_password");

        User actual_user = userService.registerUserByEmail(userCreationDto);

        verify(userRepository).save(Mockito.any(User.class));
        verify(userRepository).existsUserByEmail(userCreationDto.getEmail());

        verify(passwordEncoder).encode(userCreationDto.getPassword());
        userWithId.setJoinedOn(actual_user.getJoinedOn());
        assertThat(actual_user, is(userWithId));
    }

    @Test
    void registerUserWithTakenEmailByEmail() {
        UserCreationDto userCreationDto = new UserCreationDto("testemail@test.com", "test_password", "testname");

        when(userRepository.existsUserByEmail(userCreationDto.getEmail())).thenReturn(true);

        Exception exception = assertThrows(ResponseStatusException.class, () -> userService.registerUserByEmail(userCreationDto));

        verify(userRepository).existsUserByEmail(userCreationDto.getEmail());
        assertThat(exception.getMessage(), equalTo("400 BAD_REQUEST \"Email already registered\""));
    }

    @Test
    void loginNewUserWithGoogle() {
        GoogleProfileDto googleProfileDto = GoogleProfileDto.builder()
                .email("test_email")
                .family_name("family_name")
                .given_name("given_name")
                .name("full_name")
                .picture("picture_url")
                .verified_email(true)
                .build();

        GoogleAccessTokenDto googleAccessTokenDto = GoogleAccessTokenDto.builder()
                .access_token("access_token")
                .expires_in("46434556")
                .refresh_token("refresh_token")
                .token_type("bearer")
                .scope("scope")
                .build();

        User user = User.builder()
                .google_access_token(googleAccessTokenDto.getAccess_token())
                .google_refresh_token(googleAccessTokenDto.getRefresh_token())
                .avatar_url(googleProfileDto.getPicture())
                .role("User")
                .full_name(googleProfileDto.getName())
                .email(googleProfileDto.getEmail())
                .enabled(googleProfileDto.isVerified_email())
                .build();


        User userWithId = User.builder()
                .google_access_token(googleAccessTokenDto.getAccess_token())
                .google_refresh_token(googleAccessTokenDto.getRefresh_token())
                .avatar_url(googleProfileDto.getPicture())
                .role("User")
                .full_name(googleProfileDto.getName())
                .email(googleProfileDto.getEmail())
                .enabled(googleProfileDto.isVerified_email())
                .id("google_user_id")
                .build();

        when(userRepository.existsUserByEmail(googleProfileDto.getEmail())).thenReturn(false);
        when(userRepository.save(Mockito.any(User.class))).thenReturn(userWithId);

        User actual_user = userService.loginUserWithGoogle(googleProfileDto, googleAccessTokenDto);

        verify(userRepository).existsUserByEmail(googleProfileDto.getEmail());
        verify(userRepository).save(Mockito.any(User.class));
        userWithId.setJoinedOn(actual_user.getJoinedOn());
        assertThat(actual_user, is(userWithId));
    }

    @Test
    void loginExistingUserWithGoogle() {
        GoogleProfileDto googleProfileDto = GoogleProfileDto.builder()
                .email("test_email")
                .family_name("family_name")
                .given_name("given_name")
                .name("full_name")
                .picture("picture_url")
                .verified_email(true)
                .build();

        GoogleAccessTokenDto googleAccessTokenDto = GoogleAccessTokenDto.builder()
                .access_token("access_token")
                .expires_in("46434556")
                .refresh_token("refresh_token")
                .token_type("bearer")
                .scope("scope")
                .build();

        User userWithId = User.builder()
                .google_access_token(googleAccessTokenDto.getAccess_token())
                .google_refresh_token(googleAccessTokenDto.getRefresh_token())
                .avatar_url(googleProfileDto.getPicture())
                .role("User")
                .full_name(googleProfileDto.getName())
                .email(googleProfileDto.getEmail())
                .enabled(googleProfileDto.isVerified_email())
                .id("google_user_id")
                .build();

        when(userRepository.existsUserByEmail(googleProfileDto.getEmail())).thenReturn(true);
        when(userRepository.findUserByEmail(googleProfileDto.getEmail())).thenReturn(java.util.Optional.ofNullable(userWithId));

        User actual_user = userService.loginUserWithGoogle(googleProfileDto, googleAccessTokenDto);

        verify(userRepository).existsUserByEmail(googleProfileDto.getEmail());
        verify(userRepository).findUserByEmail(googleProfileDto.getEmail());
        assertThat(actual_user, is(userWithId));
    }

    @Test
    void loginWithCorrectData() {
        UserLoginDto userLoginDto = new UserLoginDto("testemail@test.com", "test_password");
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(new CustomUserDetails("test_username", userLoginDto.getEmail(), userLoginDto.getPassword(), List.of(new SimpleGrantedAuthority("User"))));
        when(authentication.getName()).thenReturn(userLoginDto.getEmail());

        Mockito.doReturn(List.of(new SimpleGrantedAuthority("User"))).when(authentication).getAuthorities();

        when(jwtUtilsService.createToken(new HashMap<>(Map.of("name", "test_username")), userLoginDto.getEmail())).thenReturn("jwt_test_token");

        LoginJWTDto jwtDto = userService.login(userLoginDto);

        verify(authenticationManager).authenticate(usernamePasswordAuthenticationToken);
        verify(authentication, atLeastOnce()).getPrincipal();
        verify(authentication).getName();
        verify(jwtUtilsService).createToken(new HashMap<>(Map.of("name", "test_username")), userLoginDto.getEmail());
        assertThat(jwtDto.getJwt(), is("jwt_test_token"));
        assertThat(jwtDto.getAuthorities(), arrayContainingInAnyOrder("User"));
    }

    @Test
    void loginEmailNotVerifiedData() {
        UserLoginDto userLoginDto = new UserLoginDto("testemail@test.com", "test_password");
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenThrow(new DisabledException("Disabled"));
        try {
            userService.login(userLoginDto);
            fail();
        }
        catch (ResponseStatusException e) {
            assertThat(e.getRawStatusCode(), is(400));
            verify(authenticationManager).authenticate(usernamePasswordAuthenticationToken);
        }
    }

    @Test
    void loginWithWrongData() {
        UserLoginDto userLoginDto = new UserLoginDto("testemail@test.com", "test_password");
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());

        when(authenticationManager.authenticate(usernamePasswordAuthenticationToken)).thenThrow(new BadCredentialsException("Wrong Login Data"));

        Exception exception = assertThrows(ResponseStatusException.class, () -> userService.login(userLoginDto));

        verify(authenticationManager).authenticate(usernamePasswordAuthenticationToken);
        assertThat(exception.getMessage(), equalTo("400 BAD_REQUEST \"Bad Credentials\""));
    }
}
