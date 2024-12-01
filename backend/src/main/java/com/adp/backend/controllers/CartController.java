package com.adp.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.adp.backend.models.Cart;
import com.adp.backend.services.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    
    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<?> addToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        cartService.addItemToCart(userId, productId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId) {
        cartService.removeItemFromCart(itemId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{userId}/purchase")
    public ResponseEntity<?> purchaseCart(@PathVariable Long userId) {
        try {
            cartService.purchaseCart(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Failed to process purchase: " + e.getMessage()));
        }
    }

    private static class ErrorResponse {
        private final String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
    }
} 