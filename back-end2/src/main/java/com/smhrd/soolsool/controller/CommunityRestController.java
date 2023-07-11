package com.smhrd.soolsool.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

import com.smhrd.soolsool.converter.ImageConverter;
import com.smhrd.soolsool.converter.ImageToBase64;
import com.smhrd.soolsool.domain.Community;
import com.smhrd.soolsool.service.CommunityService;

@CrossOrigin("http://localhost:3000")
@RestController
public class CommunityRestController {

	@Autowired
	private CommunityService service;

	@GetMapping("/community")
	public JSONArray CommunityList() {
		System.out.println("요청1");
		JSONArray array = service.CommunityList();
		return array;
	}

	@GetMapping("/community/{idx}")
	public JSONObject CommunityOne(@PathVariable("idx") int idx) {
		System.out.println("요청2");
		return service.CommunityOne(idx);
	}

	@PostMapping("/community/write")
	public ResponseEntity<?> write(@RequestParam("member_id") String mb_id,
			@RequestParam("comm_title") String comm_title, @RequestParam("comm_content") String comm_content,
			@RequestPart(name = "comm_file") List<MultipartFile> file) {
		System.out.println("mb_id: " + mb_id);
		System.out.println("comm_title: " + comm_title);
		System.out.println("comm_content: " + comm_content);

		// 회원 id를 매개변수로 추가해서 서비스 메서드를 호출합니다.
		Community write = service.write(mb_id, comm_title, comm_content, file);

		JSONObject jsonResponse = new JSONObject();

		if (write != null) {
			jsonResponse.put("result", "success");
			jsonResponse.put("writeResult", write);
		} else {
			jsonResponse.put("result", "fail");
		}

		return ResponseEntity.ok(jsonResponse);

	}

	@GetMapping("/community/image/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
		Resource file = new FileSystemResource("src/main/resources/static/img/" + filename);
		String mimeType;
		try {
			mimeType = Files.probeContentType(file.getFile().toPath());
		} catch (IOException e) {
			mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType)).body(file);
	}

	@GetMapping("/community/page")
	public ResponseEntity<?> CommunityListPage(@RequestParam("page") int page, @RequestParam("size") int size) {
		JSONArray communitiesArray = service.CommunityListPage(page, size);
		int totalCommunities = service.getTotalCommunities();

		JSONObject jsonResponse = new JSONObject();
		jsonResponse.put("communities", communitiesArray);
		jsonResponse.put("totalCommunities", totalCommunities);

		return ResponseEntity.ok(jsonResponse);
	}
	
	@GetMapping("/community/{comm_idx}")
	public ResponseEntity<?> getCommunityDetails(@PathVariable("comm_idx") int comm_idx) {
	    JSONObject communityDetails = service.getCommunityDetails(comm_idx);

	    if (communityDetails != null) {
	      return ResponseEntity.ok(communityDetails);
	    }
	    
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("/community/delete")
	public ResponseEntity<?> delete(@PathVariable("comm_idx") int comm_idx, @RequestParam("member_id") String mb_id) throws Exception {
	    int success = service.cdeleteCommunity(comm_idx, mb_id);
	    System.out.println("삭제시도");
	    JSONObject jsonResponse = new JSONObject();
	    jsonResponse.put("result", success==0 ? "success" : "fail");
	    return ResponseEntity.ok(jsonResponse);
	}



}
