package com.plotscart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlists")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId; // In a real app, this would be linked to a User entity

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plot_id", nullable = false)
    @JsonIgnore
    private Plot plot;

    @Column(nullable = false)
    private LocalDateTime addedDate;

    // Constructors
    public Wishlist() {
        this.addedDate = LocalDateTime.now();
    }

    public Wishlist(String userId, Plot plot) {
        this();
        this.userId = userId;
        this.plot = plot;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Plot getPlot() { return plot; }
    public void setPlot(Plot plot) { this.plot = plot; }

    public LocalDateTime getAddedDate() { return addedDate; }
    public void setAddedDate(LocalDateTime addedDate) { this.addedDate = addedDate; }

    // Method to get plot ID without triggering proxy serialization
    public Long getPlotId() {
        return plot != null ? plot.getId() : null;
    }
} 