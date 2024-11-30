package com.adp.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adp.backend.UserRepo;
import com.adp.backend.models.User;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        return userRepo.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepo.findByEmail(email);
        if (user == null || !user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    public User findByEmail(String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }
} 