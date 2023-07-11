package com.smhrd.soolsool.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.smhrd.soolsool.domain.Archive;
import com.smhrd.soolsool.domain.Community;

@Mapper
public interface ArchiveMapper {

	// comunity 전체 정보 불러오기
	public List<Archive> archiveList();

	public Archive archiveOne(int idx); // Comunity.java에 있는 글순번 idx

	public int write(Archive a);

	public int getTotalArchives();

	// 아래 메서드 추가 (memberId를 기준으로 데이터 필터링)
	public List<Archive> archiveListByMemberId(String memberId);

	public List<Archive> archiveListPage(int offset, int size);

	public int deleteArchiveByIdxAndId(@Param("arc_idx") int arc_idx, @Param("mb_id") String mb_id);

}
