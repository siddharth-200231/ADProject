package com.adp.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.adp.backend.models.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
} 