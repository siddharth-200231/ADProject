package com.adp.backend.services;

import com.adp.backend.models.Cart;
import com.adp.backend.models.CartItem;
import com.adp.backend.models.Product;
import com.adp.backend.repositories.CartRepository;
import com.adp.backend.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ProductRepo productRepo;

    public String createSession() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public Cart getOrCreateCart(String userId, boolean isUserCart) {
        return cartRepository.findByUserIdAndUserCart(userId, isUserCart)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setUserCart(isUserCart);
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });
    }

    @Transactional(readOnly = true)
    public Cart getCart(String userId, boolean isUserCart) {
        return cartRepository.findByUserIdAndUserCart(userId, isUserCart)
                .orElseGet(() -> getOrCreateCart(userId, isUserCart));
    }

    @Transactional
    public CartItem addItemToCart(String userId, int productId, int quantity, boolean isUserCart) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Cart cart = getOrCreateCart(userId, isUserCart);
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Check if product is already in cart
        CartItem cartItem = cart.findItemByProductId(productId);
        
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cart.addItem(cartItem);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cartRepository.save(cart);
        return cartItem;
    }

    @Transactional
    public void removeItemFromCart(Long cartItemId) {
        Cart cart = cartRepository.findByCartItemId(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart not found for item: " + cartItemId));
        
        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        cartRepository.save(cart);
    }

    @Transactional
    public void updateItemQuantity(Long cartItemId, int quantity) {
        Cart cart = cartRepository.findByCartItemId(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart not found for item: " + cartItemId));

        cart.getItems().stream()
            .filter(item -> item.getId().equals(cartItemId))
            .findFirst()
            .ifPresent(item -> {
                if (quantity <= 0) {
                    cart.removeItem(item);
                } else {
                    item.setQuantity(quantity);
                }
            });

        cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(String userId, boolean isUserCart) {
        Cart cart = getCart(userId, isUserCart);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    @Transactional
    public void transferSessionCartToUserCart(String sessionId, String userId) {
        Cart sessionCart = getCart(sessionId, false);
        Cart userCart = getOrCreateCart(userId, true);

        // Transfer items from session cart to user cart
        sessionCart.getItems().forEach(item -> {
            CartItem existingItem = userCart.findItemByProductId(item.getProduct().getId());
            if (existingItem != null) {
                existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
            } else {
                CartItem newItem = new CartItem();
                newItem.setProduct(item.getProduct());
                newItem.setQuantity(item.getQuantity());
                userCart.addItem(newItem);
            }
        });

        cartRepository.save(userCart);
        cartRepository.delete(sessionCart);
    }
} 