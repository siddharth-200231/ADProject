package com.adp.backend.controllers;

import com.adp.backend.models.Cart;
import com.adp.backend.models.CartItem;
import com.adp.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/session")
    public String createSession() {
        return cartService.createSession();
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId, @RequestParam boolean isUserCart) {
        return cartService.getCart(userId, isUserCart);
    }

    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<?> addToCart(
            @PathVariable String userId,
            @PathVariable int productId,
            @RequestParam(defaultValue = "1") int quantity,
            @RequestParam boolean isUserCart) {
        try {
            CartItem cartItem = cartService.addItemToCart(userId, productId, quantity, isUserCart);
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId) {
        try {
            cartService.removeItemFromCart(itemId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<?> updateCartItemQuantity(
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        try {
            CartItem updatedItem = cartService.updateItemQuantity(itemId, quantity);
            return ResponseEntity.ok(updatedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public void clearCart(
            @PathVariable String userId,
            @RequestParam boolean isUserCart) {
        cartService.clearCart(userId, isUserCart);
    }

    @PostMapping("/merge")
    public ResponseEntity<?> mergeSessionCart(
            @RequestParam String sessionId,
            @RequestParam String userId) {
        try {
            cartService.transferSessionCartToUserCart(sessionId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 