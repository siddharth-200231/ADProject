package com.adp.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import com.adp.backend.models.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
} 