import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/CommentSection.css';

const CommentSection = ({ liq_idx, MB_ID }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(MB_ID);
console.log(MB_ID);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8099/soolsool/Info/reviews/${liq_idx}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, [liq_idx]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputUserId = !MB_ID ? `${userId}(외부인)` : userId;

    const review = {
      liq_idx: liq_idx,
      mb_id: inputUserId,
      rv_content: content,
    };

    const response = await axios.post(
      `http://localhost:8099/soolsool/Info/reviews/${liq_idx}/write`,
      review,
      { withCredentials: true }
    );

    if (response.status === 200) {
      setComments((prevComments) => [...prevComments, review]);
      setContent('');
    }
  };

  const handleDeleteReview = async (rv_idx) => {
    console.log('Request params:', rv_idx, MB_ID); // 값 확인을 위한 로그 추가
    try {

      // userId 대신 MB_ID를 사용하여 요청 데이터를 구성합니다. 
      const response = await axios.delete(
        `http://localhost:8099/soolsool/Info/reviews/${rv_idx}/${MB_ID}`,
        {
          rv_content: content,
          MB_ID: MB_ID,
        }
      );
  
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.rv_idx !== rv_idx)
        );
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  
  };

  return (
    <div className="comment-section-container">
      <form className="comment-form" onSubmit={handleSubmit}>
        {MB_ID ? (
          <p>{userId}</p>
        ) : (
          <input
            type="text"
            placeholder=" 아이디 입력"
            onChange={(e) => setUserId(e.target.value)}
            maxLength={10}
            required
            autoFocus
          />
        )}

        <br />
        <div>
          <textarea
            placeholder=" 리뷰 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={23}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">리뷰 달기</button>
        </div>
        <br />
      </form>
      <div className="person">
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="comment-id"><h5>{comment.mb_id}</h5></div>
             <p>{comment.rv_content}</p>
              <div className='delete-btn'>
              <button onClick={() => handleDeleteReview(comment.rv_idx)}>
                삭제
              </button></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection;