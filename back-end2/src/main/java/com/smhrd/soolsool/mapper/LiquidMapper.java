package com.smhrd.soolsool.mapper;

import com.smhrd.soolsool.domain.Liquid;
import com.smhrd.soolsool.domain.LiquidRange;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface LiquidMapper {
    List<Liquid> findAll();

    List<Liquid> findRecommendations(LiquidRange LiquidRange);
}