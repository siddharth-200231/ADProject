package com.adp.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.adp.backend.models.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    // Custom query to get distinct categories from the product table
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllCategories();
}
