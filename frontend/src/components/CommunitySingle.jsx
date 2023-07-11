import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/CommunitySingle.css';

const CommunitySingle = () => {
  const { comm_idx } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8099/soolsool/community/${comm_idx}`
        );
        const foundItem = response.data;
        setItem(foundItem.community);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [comm_idx]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const stripHTMLTags = (content) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    return tmp.textContent || tmp.innerText || "";
  };


  
  return (
    <div className="community-single">
        <div className="comm-idx">
        <h1>{item.comm_title}</h1>
        <hr className='hr1'></hr>
        <div className='date'>
        <span>아이디 : {item.mb_id}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>작성일 : {item.comm_at}</span>
        </div>
        <hr className='hr2'></hr>
        <div className="comm-img">
          <img
            
            src={`http://localhost:8099/soolsool/static/img/${item.comm_file}`}
            alt="archive-image"
          />
        </div>
        </div>
        <div className="comm-title">
        <div className="contents-content">{stripHTMLTags(item.comm_content)}</div>
        </div>
  </div>
  );
};

export default CommunitySingle;