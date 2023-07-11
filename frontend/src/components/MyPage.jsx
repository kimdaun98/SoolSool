import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/MyPage.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [email, setEmail] = useState(null);
  const [nick, setNick] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8099/soolsool/getUserInfo', { withCredentials: true });
        setUserInfo(response.data);
        setId(response.data.id);
        setPassword(response.data.password);
        setEmail(response.data.email);
        setNick(response.data.nick);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    if (!id || !password || !email || !nick) {
      setErrorMessage('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    console.log({ mb_id: id, mb_pw: password, mb_email: email, mb_nick: nick });

    try {
      const response = await axios.put(
        'http://localhost:8099/soolsool/update',
        { mb_id: id, mb_pw: password, mb_email: email, mb_nick: nick },
        { withCredentials: true }
      );

      console.log(response);
      if (response.status === 200) {
        navigate('/');
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('정보 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <div >
      {userInfo ? (
        <div className="change-container">
          <h1 className="change-title">{id}님의 회원정보</h1>
          <form>
            <div>
              <h4>이메일 변경</h4>
              <input
                className="change-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <h4>비밀번호 변경</h4>
              <input
                className="change-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="변경할 비밀번호를 입력하세요."
              />
            </div>
            <div>
              <h4>비밀번호 확인</h4>
              <input
                className="change-input"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="변경할 비밀번호를 다시 입력하세요."
              />
            </div>

            <div>
              <h4>닉네임 변경</h4>
              <input
                className="change-input"
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
              />
            </div>
            {/* <Link to='/MyPage'> */}
            <button className="change-button" onClick={handleSave}>
              변경 사항 저장하기
            </button>
            {/* </Link> */}
          </form>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
      ) : (
        <div>로그인을 해주세요</div>
      )}
    </div>
  );
};

export default MyPage;
