import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ArchiveSingle.css';

const ArchiveSingle = () => {
  const { arc_idx } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8099/soolsool/archive/${arc_idx}`);
        const foundItem = response.data;
        setItem(foundItem.archive);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [arc_idx]);

  if (!item) {
    return <div>Loading...</div>;
  }

   // 내용에 p태그 없애는 부분 
   const stripHTMLTags = (content) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    
    <div className='archive-single'>
      <div className="arc-idx">
        <h1>{item.arc_title}</h1>
      </div>
      <div className='date'>
      <hr className='hr1'></hr>
      <span>{item.mb_id}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>작성일: {item.arc_at}</span>
      </div>
      <hr className='hr2'></hr>
      <div className='arc-img'>
      <img width='500px' src={"data:image/;base64,"+item.arc_file}></img>
      </div>
      <div className="arc-title">
        {stripHTMLTags(item.arc_content)}
      </div>
    </div>
  );
};

export default ArchiveSingle;