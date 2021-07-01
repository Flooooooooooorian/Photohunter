package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.dto.GoogleAccessTokenDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoogleLoginService {

    private final RestTemplate restTemplate;


    //Its me an Idiot, not valid
    private String client_id = "420356622210-a9lk1sicvrs5hojneedf4273i8cg10lo.apps.googleusercontent.com";
    private String client_secret = "IMQ6Hthp4iPYB7XO5L07LQNI";

    @Autowired
    public GoogleLoginService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String loginWithGoogle(String code) {
        String accessToken = getAccessToken(code);

        return accessToken;
    }

    private String getAccessToken(String code) {
        String url = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.set("code", code);
        map.set("client_id", this.client_id);
        map.set("client_secret", this.client_secret);
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", "http://localhost:3000/auth/google/redirect");

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
        ResponseEntity<GoogleAccessTokenDto> responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, GoogleAccessTokenDto.class);


        return responseEntity.getBody().getAccess_token();
    }
}
