package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Like {

	private String mb_id;
	private String liq_idx;
	private String liq_name;
	private String liq_img;
	private int arc_idx;
	private String arc_title;
	private int comm_idx;
	private String comm_title;
}
