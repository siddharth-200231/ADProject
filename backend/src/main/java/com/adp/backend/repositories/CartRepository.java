package com.adp.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adp.backend.models.Cart;
import com.adp.backend.models.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser_IdAndUserCart(Long userId, boolean userCart);
    Optional<Cart> findByUser_IdAndUserCart(User user, boolean userCart);
} 