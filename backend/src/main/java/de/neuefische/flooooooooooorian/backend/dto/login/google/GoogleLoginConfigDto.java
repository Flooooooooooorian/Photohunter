package de.neuefische.flooooooooooorian.backend.dto.login.google;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleLoginConfigDto {
    private String clientId;
    private String redirectUri;
}
