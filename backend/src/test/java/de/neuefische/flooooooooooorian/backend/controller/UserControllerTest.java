package de.neuefische.flooooooooooorian.backend.controller;

import de.neuefische.flooooooooooorian.backend.security.dto.UserCreationDto;
import de.neuefische.flooooooooooorian.backend.security.dto.UserLoginDto;
import de.neuefische.flooooooooooorian.backend.security.model.User;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import de.neuefische.flooooooooooorian.backend.security.service.JwtUtilsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "jwt.secret=testSecret")
class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtilsService jwtUtilsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void clearDb() {
        userRepository.deleteAll();
    }

    @Test
    void validLogin() {
        User user = User.builder()
                .email("test@test.com")
                .avatar_url("avatar_url")
                .enabled(true)
                .full_name("fullname")
                .role("User")
                .password(passwordEncoder.encode("test"))
                .build();

        UserLoginDto userLoginDto = new UserLoginDto(user.getEmail(), "test");

        userRepository.save(user);

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/user/login", HttpMethod.POST, new HttpEntity<>(userLoginDto), String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        try {
            jwtUtilsService.parseClaim(response.getBody());
        }
        catch (io.jsonwebtoken.MalformedJwtException e) {
            Assertions.fail(e.getMessage());
        }
    }

    @Test
    void notValidPasswordLogin() {
        User user = User.builder()
                .email("test@test.com")
                .avatar_url("avatar_url")
                .enabled(true)
                .full_name("fullname")
                .role("User")
                .password(passwordEncoder.encode("test"))
                .build();

        UserLoginDto userLoginDto = new UserLoginDto(user.getEmail(), "not_valid");

        userRepository.save(user);

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/user/login", HttpMethod.POST, new HttpEntity<>(userLoginDto), String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        try {
            jwtUtilsService.parseClaim(response.getBody());
            Assertions.fail();
        }
        catch (io.jsonwebtoken.MalformedJwtException ignored) {

        }
    }

    @Test
    void notValidEmailLogin() {
        User user = User.builder()
                .email("test@test.com")
                .avatar_url("avatar_url")
                .enabled(true)
                .full_name("fullname")
                .role("User")
                .password(passwordEncoder.encode("test"))
                .build();

        UserLoginDto userLoginDto = new UserLoginDto("nonExistingEmail", "test");

        userRepository.save(user);

        ResponseEntity<String> response = testRestTemplate.exchange("http://localhost:" + port + "/user/login", HttpMethod.POST, new HttpEntity<>(userLoginDto), String.class);

        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
        try {
            jwtUtilsService.parseClaim(response.getBody());
            Assertions.fail();
        }
        catch (io.jsonwebtoken.MalformedJwtException ignored) {

        }
    }

    @ParameterizedTest(name = "Password {0}")
    @CsvSource({"Too short, T3s!, false",
            "Too long, T3s!Password!IsToLongForThisShitButNotSureHowLongIsTooLongForAPassword?Is128CharactersAsMaximumLenghtResonableOrShouldItBeLonger?, false",
            "No Lowercase Letter, T3E!PASSWORD, false",
            "No Uppercase Letter, t3s!password, false",
            "No Special Character, T3stPassword, false",
            "No Number, Tes!Password, false",
            "With Withspace, T3s! Password, false",
            "Valid, T3s!PA7sw0rd, true",
    })
    void registeUserPasswordValidation(String textRepresantation, String password, boolean result) {
        UserCreationDto userCreationDto = new UserCreationDto("test@test.com", password, "fullname");
        User expected = User.builder()
                .email(userCreationDto.getEmail())
                .full_name(userCreationDto.getName())
                .role("User")
                .build();

        ResponseEntity<User> response = testRestTemplate.exchange("http://localhost:" + port + "/user/register", HttpMethod.POST, new HttpEntity<>(userCreationDto), User.class);

        assertThat(response.getStatusCode() == HttpStatus.OK, is(result));
        if (result) {
            assertThat(response.getBody(), notNullValue());
            assertThat(response.getBody().getId(), notNullValue());
            assertThat(passwordEncoder.matches(userCreationDto.getPassword(), response.getBody().getPassword()), is(true));

            expected.setId(response.getBody().getId());
            expected.setPassword(response.getBody().getPassword());
            assertThat(response.getBody(), is(expected));
        }

    }

    @Test
    void registerValidNewUser() {
        UserCreationDto userCreationDto = new UserCreationDto("test@test.com", "test_Password_12412@!", "fullname");
        User expected = User.builder()
                .email(userCreationDto.getEmail())
                .full_name(userCreationDto.getName())
                .role("User")
                .build();

        ResponseEntity<User> response = testRestTemplate.exchange("http://localhost:" + port + "/user/register", HttpMethod.POST, new HttpEntity<>(userCreationDto), User.class);


        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
        assertThat(response.getBody().getId(), notNullValue());
        assertThat(passwordEncoder.matches(userCreationDto.getPassword(), response.getBody().getPassword()), is(true));

        expected.setId(response.getBody().getId());
        expected.setPassword(response.getBody().getPassword());
        assertThat(response.getBody(), is(expected));
    }

    @Test
    void registerNotValidEmailUser() {
        UserCreationDto userCreationDto = new UserCreationDto("test@test.com", "test_password", "fullname");

        User user = User.builder()
                .email(userCreationDto.getEmail())
                .full_name("other name")
                .password(passwordEncoder.encode("other password"))
                .role("User")
                .enabled(true)
                .build();

        userRepository.save(user);

        ResponseEntity<User> response = testRestTemplate.exchange("http://localhost:" + port + "/user/register", HttpMethod.POST, new HttpEntity<>(userCreationDto), User.class);

        assertThat(response.getStatusCode(), is(HttpStatus.BAD_REQUEST));
    }
}
