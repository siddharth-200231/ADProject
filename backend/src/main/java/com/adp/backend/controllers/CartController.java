package com.adp.backend.controllers;

import com.adp.backend.models.Cart;
import com.adp.backend.models.CartItem;
import com.adp.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public CartItem addToCart(
            @PathVariable String userId,
            @PathVariable int productId,
            @RequestParam(defaultValue = "1") int quantity,
            @RequestParam boolean isUserCart) {
        return cartService.addItemToCart(userId, productId, quantity, isUserCart);
    }

    @DeleteMapping("/item/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeItemFromCart(cartItemId);
    }

    @PutMapping("/item/{cartItemId}")
    public void updateItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam int quantity) {
        cartService.updateItemQuantity(cartItemId, quantity);
    }

    @DeleteMapping("/{userId}")
    public void clearCart(
            @PathVariable String userId,
            @RequestParam boolean isUserCart) {
        cartService.clearCart(userId, isUserCart);
    }

    @PostMapping("/transfer")
    public void transferCart(
            @RequestParam String sessionId,
            @RequestParam String userId) {
        cartService.transferSessionCartToUserCart(sessionId, userId);
    }
} 