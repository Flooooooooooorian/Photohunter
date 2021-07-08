package de.neuefische.flooooooooooorian.backend.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Objects;

public class CustomUserDetails extends User {
    private String full_name;

    public CustomUserDetails(String full_name, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.full_name = full_name;
    }

    public CustomUserDetails(String full_name, String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.full_name = full_name;
    }

    public void setFullName(String full_name) {
        this.full_name = full_name;
    }

    public String getFullName() {
        return this.full_name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CustomUserDetails that = (CustomUserDetails) o;
        return Objects.equals(full_name, that.full_name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), full_name);
    }
}






