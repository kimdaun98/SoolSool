<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원가입</title>
</head>
<body>
    <h1>회원가입</h1>
    <form action="/soolsool/register" method="post">
        <label for="mb_id">ID:</label>
        <input type="text" id="mb_id" name="mb_id" required>
        <br>

        <label for="mb_password">Password:</label>
        <input type="password" id="mb_password" name="mb_pw" required>

        <br>

        <label for="mb_email">Email:</label>
        <input type="email" id="mb_email" name="mb_email" required>
        <br>

        <label for="mb_nick">Nickname:</label>
        <input type="text" id="mb_nick" name="mb_nick" required>
        <br>

        <button type="submit">회원가입</button>
    </form>
</body>
</html>
