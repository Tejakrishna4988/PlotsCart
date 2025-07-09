package com.plotscart.controller;

import com.plotscart.model.Plot;
import com.plotscart.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {
    
    @Autowired
    private WishlistService wishlistService;
    
    @GetMapping
    public ResponseEntity<List<Plot>> getUserWishlist(
            @RequestParam(defaultValue = "guest") String userId) {
        List<Plot> wishlist = wishlistService.getUserWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }
    
    @PostMapping("/{plotId}")
    public ResponseEntity<Map<String, String>> addToWishlist(
            @PathVariable Long plotId,
            @RequestParam(defaultValue = "guest") String userId) {
        
        boolean added = wishlistService.addToWishlist(userId, plotId);
        if (added) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Added to wishlist successfully"));
        }
        return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Failed to add to wishlist"));
    }
    
    @DeleteMapping("/{plotId}")
    public ResponseEntity<Map<String, String>> removeFromWishlist(
            @PathVariable Long plotId,
            @RequestParam(defaultValue = "guest") String userId) {
        
        boolean removed = wishlistService.removeFromWishlist(userId, plotId);
        if (removed) {
            return ResponseEntity.ok(Collections.singletonMap("message", "Removed from wishlist successfully"));
        }
        return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Failed to remove from wishlist"));
    }
    
    @GetMapping("/check/{plotId}")
    public ResponseEntity<Map<String, Boolean>> checkWishlistStatus(
            @PathVariable Long plotId,
            @RequestParam(defaultValue = "guest") String userId) {
        
        boolean isInWishlist = wishlistService.isInWishlist(userId, plotId);
        return ResponseEntity.ok(Collections.singletonMap("isInWishlist", isInWishlist));
    }
} 