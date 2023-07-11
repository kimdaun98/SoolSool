package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Liquid {
	
	private String liq_idx;
	private String liq_name;
	private String liq_type;
	private int liq_liter;
	private float liq_alcohol;
	private int liq_likes;
	private float liq_rating;
	private String liq_img;
	private String liq_tag1;
	private String liq_tag2;
	private int liq_sweet;
	private int liq_sour;
	private int liq_bitter;
	private int liq_body;
	private int liq_cacid;
	private int liq_imargery;
	private int liq_smell;
	private String liq_reminiscent1;
	private String liq_reminiscent2;
	private String liq_snack1;
	private String liq_snack2;
	private String liq_snack3;
	private int liq_review_num;

}
