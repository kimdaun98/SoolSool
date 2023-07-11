import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='mainBox'>
      <div className='mainimg'><h1> 우리들의 전통주<br/>멋있는 우리들의 술이야기</h1></div>
      <hr />
      <hr />
      <hr />
      <div className="main-rec">
        <div className='main-gap'></div>
        <button><Link to="/Recommendation">나만의 전통주 찾아보기!</Link></button>
        {/* <button><Link to="/Api">오늘의 전통주</Link></button> */}
      </div>
      {/* <div className='mainimg_2'><h3>나의 전통주 컬렉션을 자랑하고 싶을 때</h3><div className='mainimg_2_1'></div></div> */}
      <div className='mainimg_3'><h3>나만 알고있던 전통술을 모두에게 알려봐요!</h3></div>
    </div>
  );
};

export default Main;