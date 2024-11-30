package com.adp.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adp.backend.ProductRepo;
import com.adp.backend.models.Product;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    // Get all products
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // Get a product by its ID
    public Optional<Product> getProductById(int id) {
        return repo.findById(id);
    }

    // Add a new product
    public Product addProduct(Product product) {
        return repo.save(product); // Save the product and return the saved entity
    }

    // Get all unique categories
    public List<String> getAllCategory() {
        return repo.findAllCategories(); // Fetch categories using the repository method
    }
}
