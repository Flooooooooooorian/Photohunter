package de.neuefische.flooooooooooorian.backend.security.service;

import de.neuefische.flooooooooooorian.backend.security.model.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtUtilsService {
    @Value("${jwt.secret:}")
    private String secret;

    public String createToken(HashMap<String, Object> claims, String subject) {

        return Jwts.builder()
                .addClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofDays(1))))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public Claims parseClaim(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public String createPasswordResetToken(HashMap<String, Object> claims, User user) {
        Instant now = Instant.now();
        String key = user.getPassword()+(Date.from(now).getTime() / 1000) * 1000;
        return Jwts.builder()
                .addClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(30))))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Claims parseClaimsForPasswordResetToken(String token, User user) {
        int i = token.lastIndexOf('.');
        String tokenWithoutSignature = token.substring(0, i+1);

        Jwt<Header,Claims> untrusted = Jwts.parser().parseClaimsJwt(tokenWithoutSignature);
        long iat = untrusted.getBody().getIssuedAt().getTime();
        String key = user.getPassword() + iat;

        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }
}
