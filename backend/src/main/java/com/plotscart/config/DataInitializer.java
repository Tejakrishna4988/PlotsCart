package com.plotscart.config;

import com.plotscart.model.Plot;
import com.plotscart.repository.PlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PlotRepository plotRepository;

    @Override
    public void run(String... args) throws Exception {
        if (plotRepository.count() == 0) {
            // Create sample plots
            Plot plot1 = new Plot(
                "Prime Commercial Plot in BTM Layout",
                "30x40 sqft",
                "BTM Layout, Bangalore",
                "₹45 Lakhs",
                "Rajesh Kumar",
                "7780270405",
                "7780270405",
                Arrays.asList(
                    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop"
                ),
                "Excellent commercial plot in prime location with all amenities nearby. Perfect for business establishments with high footfall area."
            );

            Plot plot2 = new Plot(
                "Residential Plot near Electronic City",
                "40x60 sqft",
                "Electronic City, Bangalore",
                "₹32 Lakhs",
                "Priya Sharma",
                "7780270405",
                "7780270405",
                Arrays.asList(
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop"
                ),
                "Perfect for residential construction with clear title and all approvals. Located in a peaceful neighborhood with good connectivity."
            );

            Plot plot3 = new Plot(
                "Agricultural Land in Mysore Road",
                "1 Acre",
                "Mysore Road, Bangalore",
                "₹25 Lakhs",
                "Suresh Reddy",
                "7780270405",
                "7780270405",
                Arrays.asList(
                    "https://images.unsplash.com/photo-1574263867128-2c5b01530bfc?w=500&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop"
                ),
                "Fertile agricultural land suitable for farming and horticulture. Water facility available with proper road access."
            );

            plotRepository.saveAll(Arrays.asList(plot1, plot2, plot3));
        }
    }
} 