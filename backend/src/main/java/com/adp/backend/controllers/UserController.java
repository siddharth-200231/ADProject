package com.adp.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.adp.backend.models.User;
import com.adp.backend.services.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("user", registeredUser);
        response.put("message", "Registration successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        User user = userService.loginUser(email, password);
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("message", "Login successful");
        
        return ResponseEntity.ok(response);
    }
} 