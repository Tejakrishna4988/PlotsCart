package com.plotscart.service;

import com.plotscart.model.Plot;
import com.plotscart.repository.PlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlotService {
    
    @Autowired
    private PlotRepository plotRepository;
    
    public List<Plot> getAllActivePlots() {
        return plotRepository.findByIsActiveTrueOrderByPostedDateDesc();
    }
    
    public Optional<Plot> getPlotById(Long id) {
        return plotRepository.findById(id);
    }
    
    public Plot savePlot(Plot plot) {
        return plotRepository.save(plot);
    }
    
    public List<Plot> searchPlots(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllActivePlots();
        }
        return plotRepository.searchPlots(keyword.trim());
    }
    
    public List<Plot> getPlotsByLocation(String location) {
        return plotRepository.findByLocationContainingIgnoreCaseAndIsActiveTrue(location);
    }
    
    public void deletePlot(Long id) {
        Optional<Plot> plot = plotRepository.findById(id);
        if (plot.isPresent()) {
            Plot p = plot.get();
            p.setIsActive(false);
            plotRepository.save(p);
        }
    }
    
    public Plot updatePlot(Long id, Plot updatedPlot) {
        Optional<Plot> existingPlot = plotRepository.findById(id);
        if (existingPlot.isPresent()) {
            Plot plot = existingPlot.get();
            plot.setTitle(updatedPlot.getTitle());
            plot.setDimensions(updatedPlot.getDimensions());
            plot.setLocation(updatedPlot.getLocation());
            plot.setPrice(updatedPlot.getPrice());
            plot.setOwnerName(updatedPlot.getOwnerName());
            plot.setPhoneNumber(updatedPlot.getPhoneNumber());
            plot.setWhatsappNumber(updatedPlot.getWhatsappNumber());
            plot.setImages(updatedPlot.getImages());
            plot.setDescription(updatedPlot.getDescription());
            return plotRepository.save(plot);
        }
        return null;
    }
} 