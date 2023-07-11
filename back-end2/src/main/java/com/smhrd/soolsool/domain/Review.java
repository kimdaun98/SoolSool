package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review {

	private int rv_idx;
	private String liq_idx;
	private String mb_id;
	private String rv_content;
	private String rv_date;
}
