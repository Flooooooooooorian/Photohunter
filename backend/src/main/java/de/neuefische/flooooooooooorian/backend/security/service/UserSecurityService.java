package de.neuefische.flooooooooooorian.backend.security.service;

import de.neuefische.flooooooooooorian.backend.security.model.CustomUserDetails;
import de.neuefische.flooooooooooorian.backend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSecurityService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserSecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email)
                .map(user -> new CustomUserDetails(user.getFull_name(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority(user.getRole()))))
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist!"));
    }
}
