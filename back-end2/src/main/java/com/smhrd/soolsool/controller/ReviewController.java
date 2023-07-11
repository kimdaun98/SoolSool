package com.smhrd.soolsool.controller;

import com.smhrd.soolsool.service.ReviewService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import com.smhrd.soolsool.domain.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/Info/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{liq_idx}")
    public ResponseEntity<List<Review>> getReviewsByLiqIdx(@PathVariable("liq_idx") String liq_idx) {
        List<Review> reviews = reviewService.getReviewsByLiqIdx(liq_idx);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/{liq_idx}/write")
    public ResponseEntity<Integer> createReview(@RequestBody Review review) {
    	System.out.println(review.getLiq_idx());
    	System.out.println(review.getMb_id());
    	System.out.println(review.getRv_content());
        int createdReviewId = reviewService.createReview(review);
        return ResponseEntity.ok(createdReviewId);
    }
    
    @DeleteMapping("/{rv_idx}/{mb_id}")
    public ResponseEntity<?> deleteReview(@PathVariable("rv_idx") int rv_idx, @PathVariable("mb_id") String mb_id) {
        System.out.println(rv_idx);
        System.out.println(mb_id);
        int result = reviewService.deleteReview(rv_idx, mb_id);

        if (result > 0) {
            return ResponseEntity.status(HttpStatus.OK).body("{\"success\":true, \"message\":\"리뷰가 삭제되었습니다.\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"success\":false, \"message\":\"리뷰 삭제 과정에서 오류가 발생하였습니다.\"}");
        }
    }
}
