package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Community {
	private int comm_idx;	
	private String comm_title;  	
	private String comm_content;	
	private String comm_at;		
	private String comm_file; 	
	private String mb_id; 
	private int comm_likes; 	
	
	
	
}

