package com.adp.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adp.backend.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
} 