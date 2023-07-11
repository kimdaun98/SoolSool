package com.smhrd.soolsool.service;

import com.smhrd.soolsool.domain.Liquid;
import com.smhrd.soolsool.domain.LiquidRange;
import com.smhrd.soolsool.mapper.LiquidMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiquidService {
    @Autowired
    private LiquidMapper liquidMapper;
    
    public List<Liquid> findAll() {
        return liquidMapper.findAll();
    }

    public List<Liquid> findRecommendation(LiquidRange liquidRange) {
       // LiquidMapper에서 findRecommendations 메서드를 호출하여 결과를 가져옵니다.
       List<Liquid> liquids = liquidMapper.findRecommendations(liquidRange);
       System.out.println(liquids);
       return liquids;
    }
}