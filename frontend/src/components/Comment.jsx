import React, { useState } from 'react';


const Comment = ({ author, content }) => {
  return (
    <div className="comment">
      <div className="comment-author">{author}</div>
      <div className="comment-content">{content}</div>
    </div>
  );
};

export default Comment;