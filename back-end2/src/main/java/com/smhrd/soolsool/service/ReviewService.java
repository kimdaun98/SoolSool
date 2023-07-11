package com.smhrd.soolsool.service;

//ReviewService.java
import com.smhrd.soolsool.mapper.ReviewMapper;
import com.smhrd.soolsool.domain.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
 @Autowired
 private ReviewMapper reviewMapper;

 public Review getReviewById(String rv_idx) {
     return reviewMapper.getReviewById(rv_idx);
 }

 public int createReview(Review review) {
     return reviewMapper.createReview(review);
 }

 public List<Review> getReviewsByLiqIdx(String liqIdx) {
     return reviewMapper.findByLiqIdx(liqIdx);
 }
 
 public int deleteReview(int rv_idx, String mb_id) {
     return reviewMapper.deleteReview(rv_idx, mb_id);
 }
 
}
