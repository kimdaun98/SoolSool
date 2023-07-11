<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<button onclick="loadList()">멤버 리스트 가져오기</button>
	<!--  <div id="list"></div>-->
	<script>
		function loadList() {
			$.ajax({
				url : "/community/write", // 요청 경로 지정 : localhost:8089/myapp/member
				type : "post", // 요청 방식 지정
				dataType : "json", // 응답받는 데이터 형식 (view(html,jsp) x, model)
				success : function(res) { //요청-응답 성공
					console.log(res)
				
				},
				error : function() {
					alert("통신 실패")
				}
			})
		}
	</script>
</body>
</html>