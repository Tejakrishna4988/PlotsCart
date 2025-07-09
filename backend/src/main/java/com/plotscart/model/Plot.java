package com.plotscart.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "plots")
public class Plot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Dimensions are required")
    @Column(nullable = false)
    private String dimensions;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @NotBlank(message = "Price is required")
    @Column(nullable = false)
    private String price;

    @NotBlank(message = "Owner name is required")
    @Column(nullable = false)
    private String ownerName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @Column(nullable = false)
    private String phoneNumber;

    @NotBlank(message = "WhatsApp number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "WhatsApp number must be 10 digits")
    @Column(nullable = false)
    private String whatsappNumber;

    @ElementCollection
    @CollectionTable(name = "plot_images", joinColumns = @JoinColumn(name = "plot_id"))
    @Column(name = "image_url")
    private List<String> images;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime postedDate;

    @Column(nullable = false)
    private Boolean isActive = true;

    // Constructors
    public Plot() {
        this.postedDate = LocalDateTime.now();
    }

    public Plot(String title, String dimensions, String location, String price, 
                String ownerName, String phoneNumber, String whatsappNumber, 
                List<String> images, String description) {
        this();
        this.title = title;
        this.dimensions = dimensions;
        this.location = location;
        this.price = price;
        this.ownerName = ownerName;
        this.phoneNumber = phoneNumber;
        this.whatsappNumber = whatsappNumber;
        this.images = images;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDimensions() { return dimensions; }
    public void setDimensions(String dimensions) { this.dimensions = dimensions; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getPostedDate() { return postedDate; }
    public void setPostedDate(LocalDateTime postedDate) { this.postedDate = postedDate; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getWhatsappLink() {
        return "https://wa.me/91" + this.whatsappNumber + "?text=Hi, I'm interested in your plot: " + this.title;
    }
} 