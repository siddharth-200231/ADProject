package com.adp.backend.services;

import com.adp.backend.models.Cart;
import com.adp.backend.models.CartItem;
import com.adp.backend.models.Product;
import com.adp.backend.models.User;
import com.adp.backend.repositories.CartRepository;
import com.adp.backend.repositories.ProductRepository;
import com.adp.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUser_IdAndIsUserCart(userId, true)
            .orElseGet(() -> {
                Cart newCart = new Cart();
                User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
                newCart.setUser(user);
                newCart.setIsUserCart(true);
                return cartRepository.save(newCart);
            });
    }

    @Transactional
    public void addItemToCart(Long userId, Long productId, Integer quantity) {
        Cart cart = getCartByUserId(userId);
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getItems().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst()
            .orElseGet(() -> {
                CartItem newItem = new CartItem();
                newItem.setProduct(product);
                cart.getItems().add(newItem);
                return newItem;
            });

        cartItem.setQuantity(quantity);
        cartRepository.save(cart);
    }

    @Transactional
    public void removeItemFromCart(Long itemId) {
        cartRepository.deleteById(itemId);
    }
} 