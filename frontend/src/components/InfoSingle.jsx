import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/InfoSingle.css';
import CommentSection from './CommentSection';

const InfoSingle = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const itemIdentifier = pathname.replace('/InfoSingle/', '');

  const [user, setUser] = useState(null);
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get('http://localhost:8099/soolsool/checkLoginStatus', { withCredentials: true });
      setUser(response.data.memberId);
      
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemResponse = await axios.get('http://localhost:8099/soolsool/Info');
        const foundItem = itemResponse.data.find((item) => item.liq_idx === itemIdentifier);
        setItem(foundItem);

        const reviewResponse = await axios.get(`http://localhost:8099/soolsool/Info/reviews/${itemIdentifier}`);
        setReviews(reviewResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [itemIdentifier]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-single">
        <div className="liq_img">
          <a href="#" >
            <img
              src={item.liq_img}
              id="img-fluid"
              alt="Colorlib Template"
              className="liq_imageinfo"
            />
          </a>
        </div>
        
        <div className="contents">
          <div className="liq_name">
            <h1>{item.liq_name} </h1>
            
            <div><br/></div>

            <p className="liq_value">
              <span>{item.liq_type}</span></p>
            <p>도수 :{item.liq_alcohol}%</p>
            <p>용량 : {item.liq_liter}ML</p>
            <p>어울리는 음식:{item.liq_snack1} , {item.liq_snack2} , {item.liq_snack3}</p>
            <p>{item.liq_tag1}</p>
            <p>{item.liq_tag2}</p>
          </div>
          <div><br/><br/><br/></div>
          <div className="reviews">
        <span><h2>리뷰</h2></span>
        <CommentSection liq_idx={itemIdentifier} MB_ID={user} />
      </div>
      
        </div>
      
      </div>
      
      
    </div>
  );
};

export default InfoSingle;