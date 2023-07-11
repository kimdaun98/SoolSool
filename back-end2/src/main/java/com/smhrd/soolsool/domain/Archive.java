package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Archive {

	private int arc_idx;
	private String arc_title;
	private String arc_content;
	private String arc_at;
	private String arc_file;
	private String mb_id;
	private int arc_likes;
}
