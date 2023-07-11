package com.smhrd.soolsool.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.soolsool.converter.ImageConverter;
import com.smhrd.soolsool.converter.ImageToBase64;
import com.smhrd.soolsool.domain.Archive;
import com.smhrd.soolsool.mapper.ArchiveMapper;

@Service
public class ArchiveService {

	@Autowired
	private ArchiveMapper mapper;

	@Autowired
	private ResourceLoader resourceLoader;

	private static final String UPLOAD_DIRECTORY = "src/main/resources/static/arcImg"; //리액트 웹에서 접근 가능한 경로
	
	public JSONArray ArchiveList(String memberId) {
		List<Archive> list;
		if (memberId == null || memberId.isEmpty()) {
			list = mapper.archiveList();
		} else {
			list = mapper.archiveListByMemberId(memberId); // 변경: memberId를 기준으로 데이터 가져옴
		}

		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		// Community -> JsonObject
		for (Archive a : list) {
			String filePath = "classpath:/static/arcImg/" + a.getArc_file();
			Resource resource = resourceLoader.getResource(filePath); // 파일의 메타데이터
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			}
			a.setArc_file(fileStringValue);
			JSONObject obj = new JSONObject(); // 비어있는 json object 생성
			obj.put("archive", a); // 비어있는 object에 값을 추가한 것

			jsonArray.add(obj);
		}
		return jsonArray;
	}
	
	public JSONObject ArchiveOne(int idx) {
		Archive archive = mapper.archiveOne(idx);
		
		ImageConverter<File, String> converter = new ImageToBase64();
		
		String filepath = "classpath:/static/arcImg/" + archive.getArc_file();
		Resource resource = resourceLoader.getResource(filepath);
		String fileStringValue = null;
		try {
			fileStringValue = converter.convert(resource.getFile());
		} catch (IOException e) {
			e.printStackTrace();
		}

		archive.setArc_file(fileStringValue);
		
		JSONObject obj = new JSONObject();
		obj.put("archive", archive);

		return obj;

	}
	
	public Archive write(String arc_title, String arc_content, List<MultipartFile> file, String MB_ID) {
		Archive archive = new Archive();
		archive.setArc_title(arc_title);
		archive.setArc_content(arc_content);
		archive.setMb_id(MB_ID);
		// 파일 처리 및 파일 경로 설정
		List<String> fileUrls = new ArrayList<>();
		for (MultipartFile f : file) {
			String fileUrl = saveFile(f); // 파일 저장 및 파일 경로 반환하는 메서드 호출
			if (fileUrl != null) {
				fileUrls.add(fileUrl);
			}
		}
		// 파일 경로를 문자열로 변환하여 Community 객체에 저장
		archive.setArc_file(String.join(",", fileUrls));

		// 생성된 Community 객체를 DB에 삽입 (mapper를 활용하여 DB작업)
		mapper.write(archive);

		return archive;
	}
	
	// 이미지 파일 저장하기
		public String saveFile(MultipartFile file) {
			// 파일 저장
			// 예시: 원본 파일의 확장자를 유지하여 저장하는 방식
			String originalFileName = file.getOriginalFilename(); // 원본파일 이름
			String fileName = UUID.randomUUID().toString() + getExtension(originalFileName); // 임의의 파일 이름 + 확장자
			String directoryPath = "src/main/resources/static/arcImg"; // 파일이 저장될 디렉토리 경로
			try {
				// 파일 저장 로직 구현
				byte[] bytes = file.getBytes();
				Path path = Paths.get(directoryPath, fileName);
				Files.write(path, bytes);

				System.out.println("파일 저장 성공");
				String filePath =  fileName;// 리액트 웹에서 접근 가능한 파일 경로

				System.out.println(filePath);
				return filePath; // 저장된 파일의 경로 반환

			} catch (IOException e) {
				// 파일 저장 실패시 예외 처리
				e.printStackTrace();
				System.out.println("파일 저장 실패");
				return null;
			}
		}
	
		// 확장자까지 저장하기
		private String getExtension(String filename) {
			int lastIndex = filename.lastIndexOf(".");
			if (lastIndex == -1) {
				return ""; // 확장자가 없는 경우

			}
			return filename.substring(lastIndex); // 확장자를 포함한 경우
		}
	
		// 페이징
		public JSONArray ArchiveListPage(int page, int size) {
			List<Archive> archives = mapper.archiveListPage(page * size, size);
			JSONArray jsonArray = new JSONArray();
			ImageConverter<File, String> converter = new ImageToBase64();
			
			
			for (Archive archive : archives) {
				String filePath = "classpath:/static/arcImg/" + archive.getArc_file();
				Resource resource = resourceLoader.getResource(filePath);
				System.out.println("serveice getArc_file : "+archive.getArc_file());
				String fileStringValue = null;
				try {
					fileStringValue = converter.convert(resource.getFile());
				} catch (IOException e) {
					e.printStackTrace();
				}
				archive.setArc_file(fileStringValue);
				
				
				JSONObject obj = new JSONObject();
				obj.put("archive", archive);
				jsonArray.add(obj);
			}
			return jsonArray;
		}

	public int getTotalArchives() {
	    return mapper.getTotalArchives();
	}
	
	public boolean deleteArchiveByIdxAndId(int arc_idx, String mb_id) {
	    int result = mapper.deleteArchiveByIdxAndId(arc_idx, mb_id);
	    return result == 1;
	}


}