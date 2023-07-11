import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import Pagination from "react-js-pagination";

import '../css/MyStorage.css';


const MyStorage = () => {
 const [page, setPage] = useState(1);
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8099/soolsool/archive?page=${page - 1}&size=10`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArchives(data);
        } else {
          console.error('응답 데이터가 배열 형식이 아닙니다.', data);
          setArchives([]);
        }
      })
      .catch((error) => {
        console.error('데이터를 가져오는 데 오류가 발생했습니다.', error);
        setArchives([]);
      });
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page);
  };


  return (
  <>
  <div className='Storage'>
    <div className='Storage_container'>
      <h1>내 술창고</h1>
    </div>
    <div>
      <button className="storage-write">
        <Link to="/ArchiveWriting">글작성</Link>
      </button>
    </div>
    <div className='Info_Main'>
      {archives && archives.map((archiveObj) => {
        const archive = archiveObj.archive;
          return (
            <div key={archive.arc_idx} className='Info_Box'>
              <img src={`http://localhost:8099/soolsool/static/arcImg/${archive.arc_file}`} alt="archive-image" />
              <p className='Storage_Box_description'>#태그</p>
              <div className='Storage_Descr'>
                <a href={`/archive/${archive.arc_idx}`}><h2>{archive.arc_title}</h2></a>
              </div>
            </div>
            );
          })}
    </div>
  </div>

  <div className='Info_PaginationWrapper'>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={100}
          pageRangeDisplayed={5}
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
  </div>
  </>   
  );
};

export default MyStorage;