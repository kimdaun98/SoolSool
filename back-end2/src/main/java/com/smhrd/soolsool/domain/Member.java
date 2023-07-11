package com.smhrd.soolsool.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member {
    private String mb_id;
    private String mb_pw;
    private String mb_email;
    private String mb_nick;
}
