import React, { useState } from 'react';

const LikeButton = () => {
  const [num, setNum] = useState(0);
  const [heart, setHeart] = useState('🤍');

  const handleLike = () => {
    if (heart === '🤍') {
      setNum(num + 1);
      setHeart('❤');
    } else {
      setNum(num - 1);
      setHeart('🤍');
    }
  };

  return (
    <div>
        <button><span onClick={handleLike}>{heart}</span>{" "}</button>
        <span>좋아요 {num}개</span>
    </div>
  );
};

export default LikeButton;
