package de.neuefische.flooooooooooorian.backend.security.repository;

import de.neuefische.flooooooooooorian.backend.security.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, String> {

    boolean existsUserByEmail(String email);
    Optional<User> findUserByEmail(String email);
}
