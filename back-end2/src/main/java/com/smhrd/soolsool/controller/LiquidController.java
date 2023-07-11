package com.smhrd.soolsool.controller;

import com.smhrd.soolsool.domain.Liquid;
import com.smhrd.soolsool.domain.LiquidRange;
import com.smhrd.soolsool.service.LiquidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LiquidController {
    @Autowired
    private LiquidService liquidService;

    @GetMapping("/Info")
    public ResponseEntity<List<Liquid>> list() {
        List<Liquid> liquids = liquidService.findAll();
        return ResponseEntity.ok(liquids);
    }
    
    @GetMapping("/Info/WithMultipleRanges")
    public ResponseEntity<List<Liquid>> getRecommendations(@RequestParam String liq_type, @RequestParam Integer liq_degree_min, @RequestParam Integer liq_degree_max, @RequestParam Integer liq_sweet_min, @RequestParam Integer liq_sweet_max, @RequestParam Integer liq_sour_min, @RequestParam Integer liq_sour_max, @RequestParam Integer liq_smell_min, @RequestParam Integer liq_smell_max, @RequestParam Integer liq_bitter_min, @RequestParam Integer liq_bitter_max, @RequestParam Integer liq_cacid_min, @RequestParam Integer liq_cacid_max) {
           
        LiquidRange liquidRange = new LiquidRange();
        liquidRange.setLiq_type(liq_type);
        liquidRange.setLiq_degree_min(liq_degree_min);
        liquidRange.setLiq_degree_max(liq_degree_max);
        liquidRange.setLiq_sweet_min(liq_sweet_min);
        liquidRange.setLiq_sweet_max(liq_sweet_max);
        liquidRange.setLiq_sour_min(liq_sour_min);
        liquidRange.setLiq_sour_max(liq_sour_max);
        liquidRange.setLiq_smell_min(liq_smell_min);
        liquidRange.setLiq_smell_max(liq_smell_max);
        liquidRange.setLiq_bitter_min(liq_bitter_min);
        liquidRange.setLiq_bitter_max(liq_bitter_max);
        liquidRange.setLiq_cacid_min(liq_cacid_min);
        liquidRange.setLiq_cacid_max(liq_cacid_max);
        
        List<Liquid> recommendations = liquidService.findRecommendation(liquidRange);
        System.out.println(recommendations);
        
        return ResponseEntity.ok(recommendations);
    }

}
