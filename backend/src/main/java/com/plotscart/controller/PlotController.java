package com.plotscart.controller;

import com.plotscart.model.Plot;
import com.plotscart.service.PlotService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/plots")
@CrossOrigin(origins = "http://localhost:3000")
public class PlotController {
    
    @Autowired
    private PlotService plotService;
    
    @GetMapping
    public ResponseEntity<List<Plot>> getAllPlots(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String location) {
        
        List<Plot> plots;
        
        if (search != null && !search.trim().isEmpty()) {
            plots = plotService.searchPlots(search);
        } else if (location != null && !location.trim().isEmpty()) {
            plots = plotService.getPlotsByLocation(location);
        } else {
            plots = plotService.getAllActivePlots();
        }
        
        return ResponseEntity.ok(plots);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Plot> getPlotById(@PathVariable Long id) {
        Optional<Plot> plot = plotService.getPlotById(id);
        return plot.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Plot> createPlot(@Valid @RequestBody Plot plot) {
        try {
            Plot savedPlot = plotService.savePlot(plot);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPlot);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Plot> updatePlot(@PathVariable Long id, @Valid @RequestBody Plot plot) {
        Plot updatedPlot = plotService.updatePlot(id, plot);
        if (updatedPlot != null) {
            return ResponseEntity.ok(updatedPlot);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlot(@PathVariable Long id) {
        plotService.deletePlot(id);
        return ResponseEntity.noContent().build();
    }
} 