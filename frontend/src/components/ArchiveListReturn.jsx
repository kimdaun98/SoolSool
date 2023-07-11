import React from 'react';
import '../css/Archive.css';

const ArchiveListReturn = ({ archive }) => {
  return (
    <div className="archive-container">
      <div className="archive-title">
        <a href={`/archive/${archive.arc_idx}`}>
          <h2>{archive.arc_title}</h2>
        </a>
      </div>
      <h4>{archive.mb_id}</h4>
      {/* <div className="archive-img-wrapper"> */}
        <img
          className="archive-img"
          src={`http://localhost:8099/soolsool/static/arcImg/${archive.arc_file}`}
          alt="archive-image"
        />
      {/* </div> */}
    </div>
  );
};

export default ArchiveListReturn;