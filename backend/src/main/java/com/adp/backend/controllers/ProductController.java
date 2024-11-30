package com.adp.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.adp.backend.models.Product;
import com.adp.backend.services.ProductService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable int id) {
        Optional<Product> product = service.getProductById(id);
        return product.orElse(null);
    }

    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        return service.addProduct(product);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return service.getAllCategory();
    }
}
