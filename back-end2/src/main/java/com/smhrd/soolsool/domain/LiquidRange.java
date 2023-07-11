package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LiquidRange {
    private String liq_type;
    private Integer liq_degree_min;
    private Integer liq_degree_max;
    private Integer liq_sweet_min;
    private Integer liq_sweet_max;
    private Integer liq_sour_min;
    private Integer liq_sour_max;
    private Integer liq_bitter_min;
    private Integer liq_bitter_max;
    private Integer liq_cacid_min;
    private Integer liq_cacid_max;
    private Integer liq_smell_min;
    private Integer liq_smell_max;
    
}