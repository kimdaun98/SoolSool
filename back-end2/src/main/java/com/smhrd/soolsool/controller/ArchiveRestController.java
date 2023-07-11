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
import com.smhrd.soolsool.domain.Archive;
import com.smhrd.soolsool.service.ArchiveService;

@CrossOrigin("http://localhost:3000")
@RestController
public class ArchiveRestController {

	@Autowired
	private ArchiveService service;

	@GetMapping("/archive")
	public JSONArray ArchiveList(@RequestParam(required = false) String memberId) {
		System.out.println("123123");
	    JSONArray array;
	    if (memberId != null) {
	        array = service.ArchiveList(memberId);
	    } else {
	        array = service.ArchiveList(memberId);
	    }
	    return array;
	}

	@GetMapping("/archive/{idx}")
	public JSONObject ArchiveOne(@PathVariable("idx") int idx) {
		System.out.println("요청2");
		return service.ArchiveOne(idx);
	}

	@PostMapping("/archive/write")
	public ResponseEntity<?> write(@RequestParam("arc_title") String arc_title, @RequestParam("member_Id") String mb_id,
			@RequestParam("arc_content") String arc_content,
			@RequestPart(name = "arc_file") List<MultipartFile> file)

	{
		// boardInsert 메서드에 매개변수들 전달
		Archive write = service.write(arc_title, arc_content, file, mb_id);
		
		JSONObject jsonResponse = new JSONObject();

	    if (write != null) {
	        jsonResponse.put("result", "success");
	        jsonResponse.put("writeResult", write);
	    } else {
	        jsonResponse.put("result", "fail");
	    }

		return ResponseEntity.ok(jsonResponse); // 예시로 간단히 응답만 반환하도록 설정

	}
	
	@GetMapping("/archive/image/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
	    Resource file = new FileSystemResource("src/main/resources/static/arcImg/" + filename);
	    String mimeType;
	    try {
	        mimeType = Files.probeContentType(file.getFile().toPath());
	        if (mimeType == null || mimeType.isEmpty()) {
	            mimeType = MediaType.IMAGE_PNG_VALUE; // 기본 이미지 MIME 타입 변경
	        }
	    } catch (IOException e) {
	        mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
	    }
	    return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType)).body(file);
	}
	
//	@GetMapping("/archive/page")
//	public ResponseEntity<?> ArchiveListPage(@RequestParam("page") int page, @RequestParam("size") int size) {
//	    JSONArray archivesArray = service.ArchiveListPage(page, size);
//	    int totalArchives = service.getTotalArchives();
//
//	    JSONObject jsonResponse = new JSONObject();
//	    jsonResponse.put("archives", archivesArray);
//	    jsonResponse.put("totalArchives", totalArchives);
//
//	    return ResponseEntity.ok(jsonResponse);
//	}
	
	@PostMapping("/archive/delete")
	public ResponseEntity<?> deleteArchive(@RequestParam("arc_idx") int arc_idx, @RequestParam("mb_id") String mb_id) throws Exception {
	    System.out.println("삭제 실행!");
	    boolean archivesArray = service.deleteArchiveByIdxAndId(arc_idx, mb_id);

	    JSONObject jsonResponse = new JSONObject();

	    if (archivesArray) {
	        jsonResponse.put("result", "success");
	    } else {
	        jsonResponse.put("result", "fail");
	    }

	    return ResponseEntity.ok(jsonResponse);
	}

	
	
}
