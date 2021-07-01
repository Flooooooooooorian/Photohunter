package de.neuefische.flooooooooooorian.backend.service;

import de.neuefische.flooooooooooorian.backend.config.GoogleLoginConfig;
import de.neuefische.flooooooooooorian.backend.dto.GoogleAccessTokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleLoginService {

    private final RestTemplate restTemplate;
    private final GoogleLoginConfig googleLoginConfig;

    @Autowired
    public GoogleLoginService(RestTemplate restTemplate, GoogleLoginConfig googleLoginConfig) {
        this.restTemplate = restTemplate;
        this.googleLoginConfig = googleLoginConfig;
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
        map.set("client_id", googleLoginConfig.getClientId());
        map.set("client_secret", googleLoginConfig.getClientSecret());
        map.set("grant_type", "authorization_code");
        map.set("redirect_uri", googleLoginConfig.getRedirectUri());

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
        ResponseEntity<GoogleAccessTokenDto> responseEntity = restTemplate.exchange(url, HttpMethod.POST, httpEntity, GoogleAccessTokenDto.class);


        return responseEntity.getBody().getAccess_token();
    }
}
