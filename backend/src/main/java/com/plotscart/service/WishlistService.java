package com.plotscart.service;

import com.plotscart.model.Plot;
import com.plotscart.model.Wishlist;
import com.plotscart.repository.PlotRepository;
import com.plotscart.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishlistService {
    
    @Autowired
    private WishlistRepository wishlistRepository;
    
    @Autowired
    private PlotRepository plotRepository;
    
    public List<Plot> getUserWishlist(String userId) {
        List<Wishlist> wishlists = wishlistRepository.findByUserIdWithPlotOrderByAddedDateDesc(userId);
        return wishlists.stream()
                .map(Wishlist::getPlot)
                .filter(plot -> plot.getIsActive())
                .collect(Collectors.toList());
    }
    
    public boolean addToWishlist(String userId, Long plotId) {
        Optional<Plot> plot = plotRepository.findById(plotId);
        if (plot.isPresent() && plot.get().getIsActive()) {
            if (!wishlistRepository.existsByUserIdAndPlot(userId, plot.get())) {
                Wishlist wishlist = new Wishlist(userId, plot.get());
                wishlistRepository.save(wishlist);
                return true;
            }
        }
        return false;
    }
    
    @Transactional
    public boolean removeFromWishlist(String userId, Long plotId) {
        Optional<Plot> plot = plotRepository.findById(plotId);
        if (plot.isPresent()) {
            try {
                wishlistRepository.deleteByUserIdAndPlot(userId, plot.get());
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }
    
    public boolean isInWishlist(String userId, Long plotId) {
        Optional<Plot> plot = plotRepository.findById(plotId);
        return plot.isPresent() && wishlistRepository.existsByUserIdAndPlot(userId, plot.get());
    }
} 