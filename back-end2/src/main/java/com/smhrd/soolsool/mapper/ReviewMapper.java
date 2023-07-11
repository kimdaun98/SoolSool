package com.smhrd.soolsool.mapper;

import com.smhrd.soolsool.domain.Review;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ReviewMapper {
    Review getReviewById(String rv_idx);
    int createReview(Review review);
    List<Review> findByLiqIdx(String liqIdx);
    int deleteReview(int rv_idx, String mb_id);
    
}
