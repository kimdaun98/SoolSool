package com.smhrd.soolsool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.soolsool.domain.Member;
import com.smhrd.soolsool.service.MemberService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") 
public class MemberController {

	@Autowired
	private MemberService memberService;

	@GetMapping("/member")
	public String home() {
	    return "member";
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Member member) {
	    int result = memberService.save(member);

	    if(result == 1) {
	        System.out.println("회원가입 실패");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"success\":false, \"message\":\"회원가입 실패\"}");
	    }

	    System.out.println("회원가입 성공");
	    return ResponseEntity.status(HttpStatus.OK).body("{\"success\":true, \"message\":\"회원가입 성공\"}");
	}

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody Member member, HttpSession session) {
	    Member loggedInMember = memberService.login(member);

	    if (loggedInMember == null) {
	        System.out.println("로그인 실패");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
	    }

	    session.setAttribute("memberId", loggedInMember.getMb_id()); // 로그인 성공 시 세션에 사용자 ID 저장
	    System.out.println("로그인 성공");

	    String sessionId = session.getId();

	    // JSON 응답 몸체 생성
	    Map<String, String> responseBody = new HashMap<>();
	    responseBody.put("memberId", loggedInMember.getMb_id());
	    responseBody.put("sessionId", sessionId);

	    return ResponseEntity.status(HttpStatus.OK).body(responseBody); // JSON 응답 몸체를 포함한 응답 반환
	}

	@PostMapping("/checkId")
	public ResponseEntity<Object> checkId(@RequestBody Member member) {
	    System.out.println(member.getMb_id());
		boolean isIdAvailable = memberService.checkId(member.getMb_id());
	    
	    Map<String, Object> responseBody = new HashMap<>();
	    responseBody.put("success", isIdAvailable);
	    
	    if (isIdAvailable) {
	        responseBody.put("message", "사용 가능한 아이디입니다.");
	        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	    } else {
	        responseBody.put("message", "이미 사용 중인 아이디입니다.");
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
	    }
	}

	@GetMapping("/getUserInfo")
	public ResponseEntity<Object> getUserInfo(HttpSession session) {
		System.out.println((String) session.getAttribute("memberId"));
	    String memberId = (String) session.getAttribute("memberId"); // 수정된 부분

	    if (memberId == null) {
	        System.out.println("사용자 정보 조회 실패");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 정보 조회 실패");
	    }

	    Member userInfo = memberService.getUserInfoById(memberId);

	    if (userInfo == null) {
	        System.out.println("사용자 정보 조회 실패");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보 조회 실패");
	    }

	    // JSON 응답 몸체 생성 (중요한 정보는 포함하지 않습니다)
	    Map<String, Object> responseBody = new HashMap<>();
	    responseBody.put("id", userInfo.getMb_id());
	    responseBody.put("email", userInfo.getMb_email());
	    responseBody.put("nick", userInfo.getMb_nick());
	    // 필요한 사용자 정보를 여기에 추가하십시오

	    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
	
	@GetMapping("/checkLoginStatus")
	public ResponseEntity<Object> checkLoginStatus(HttpSession session) {
	    // 로그인 상태 확인
	    String memberId = (String) session.getAttribute("memberId");

	    Map<String, Object> responseBody = new HashMap<>();
	    if (memberId != null) {
	        responseBody.put("loggedIn", true);
	        responseBody.put("memberId", memberId);
	        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	    } else {
	        responseBody.put("loggedIn", false);
	        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	    }
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpSession session) {
	    session.invalidate(); // 세션 유효성을 삭제하여 로그아웃 처리
	    return ResponseEntity.status(HttpStatus.OK).body("로그아웃 성공");
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateUserInfo(@RequestBody Member member) {
	    if (member.getMb_id() != null) {
	        int result = memberService.updateUserInfo(member);
	        if (result > 0) {
	            System.out.println("사용자 정보 수정 성공");
	            return ResponseEntity.status(HttpStatus.OK).body("사용자 정보가 수정되었습니다.");
	        } else {
	            System.out.println("사용자 정보 수정 실패");
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 정보 수정 과정에서 오류가 발생했습니다.");
	        }
	    } else {
	        System.out.println("사용자 정보 수정 실패");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("수정 권한이 없습니다.");
	    }
	}
	
		@PostMapping("/member/delete")
	    public ResponseEntity<String> deleteUser(@RequestBody Member member, HttpSession session) {
	        String mb_id = (String) session.getAttribute("memberId");
	        System.out.println(mb_id);
	        // 로그인 상태 확인
	        if (mb_id == null || !member.getMb_id().equals(mb_id)) {
	            System.out.println("회원탈퇴 실패: 로그인 상태가 아닙니다.");
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"success\":false, \"message\":\"로그인 상태가 아닙니다.\"}");
	        }

	        // 아이디와 비밀번호가 일치하는지 확인
	        Member loggedInMember = memberService.login(member);
	        if (loggedInMember == null) {
	            System.out.println("회원탈퇴 실패: 아이디와 비밀번호가 일치하지 않습니다.");
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"success\":false, \"message\":\"아이디와 비밀번호가 일치하지 않습니다.\"}");
	        }

	        // 회원 탈퇴 처리를 위한 서비스 메서드 호출
	        int result = memberService.deleteUser(mb_id);

	        // 회원 탈퇴 성공 여부 확인
	        if (result > 0) {
	            System.out.println("회원 탈퇴 성공");
	            session.invalidate(); // 세션을 제거하여 로그아웃 처리
	            return ResponseEntity.status(HttpStatus.OK).body("{\"success\":true, \"message\":\"회원 탈퇴되었습니다.\"}");
	        } else {
	            System.out.println("회원 탈퇴 실패");
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"success\":false, \"message\":\"회원 탈퇴 과정에서 오류가 발생하였습니다.\"}");
	        }
	    }



}
