package com.adp.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adp.backend.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndUserCart(String userId, boolean userCart);
    
    @Query("SELECT ci.cart FROM CartItem ci WHERE ci.id = :cartItemId")
    Optional<Cart> findByCartItemId(@Param("cartItemId") Long cartItemId);
} 