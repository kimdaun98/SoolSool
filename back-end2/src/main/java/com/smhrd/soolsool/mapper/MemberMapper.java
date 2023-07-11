package com.smhrd.soolsool.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.smhrd.soolsool.domain.Member;

@Mapper
public interface MemberMapper {
    void insertMember(Member member);
    Member getMemberByMb_id(String mb_id);
    
    Member login(@Param("mb_id") String mb_id, @Param("mb_pw") String mb_pw);
    
    Member findById(@Param("mb_id") String mb_id);
    
    Member find_info(@Param("mb_id") String mb_id);

    int updateUserInfo(Member member);
    
    void deleteById(String mb_id);

}
