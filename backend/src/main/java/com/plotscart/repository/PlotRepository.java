package com.plotscart.repository;

import com.plotscart.model.Plot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlotRepository extends JpaRepository<Plot, Long> {
    List<Plot> findByIsActiveTrueOrderByPostedDateDesc();
    
    @Query("SELECT p FROM Plot p WHERE p.isActive = true AND " +
           "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Plot> searchPlots(@Param("keyword") String keyword);
    
    List<Plot> findByLocationContainingIgnoreCaseAndIsActiveTrue(String location);
} 