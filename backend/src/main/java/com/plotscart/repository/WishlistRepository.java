package com.plotscart.repository;

import com.plotscart.model.Plot;
import com.plotscart.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserIdOrderByAddedDateDesc(String userId);
    
    @Query("SELECT w FROM Wishlist w JOIN FETCH w.plot WHERE w.userId = :userId ORDER BY w.addedDate DESC")
    List<Wishlist> findByUserIdWithPlotOrderByAddedDateDesc(@Param("userId") String userId);
    
    Optional<Wishlist> findByUserIdAndPlot(String userId, Plot plot);
    boolean existsByUserIdAndPlot(String userId, Plot plot);
    void deleteByUserIdAndPlot(String userId, Plot plot);
} 