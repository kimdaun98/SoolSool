import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ArchiveListReturn from './ArchiveListReturn';
import Pagination from "react-js-pagination";

const MyArchive = () => {
  const [page, setPage] = useState(1);
  const [archives, setArchives] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;


// useEffect(()=>{checkLoginStatus()},[memberId])
useEffect(()=>{
  if(!memberId){
  checkLoginStatus()
  }
},[])

  // 로그인 상태 변경 시 글작성 버튼 갱신을 위한 useEffect
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:8099/soolsool/checkLoginStatus', { withCredentials: true });
      if (response.data.loggedIn) {
        setMemberId(response);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    console.log("memberfirst", memberId)
    if (!memberId) return;
    fetch(`http://localhost:8099/soolsool/archive?page=${page-1}&size=10&memberId=${memberId.data.memberId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const totalCount = data.length;
            setTotalItems(totalCount);
  
            const currentPageItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
            setArchives(currentPageItems);
          } else {
            console.error("응답 데이터가 배열 형식이 아닙니다.", data);
            setArchives([]);
          }
        })
        .catch((error) => {
            console.error('데이터를 가져오는 데 오류가 발생했습니다.', error);
            setArchives([]);
        });
  }, [memberId]);


  const handlePageChange = (page) => {
    setPage(page);
  };
  

  return (
    <>
      <div className='Storage'>
        <div className='Storage_container'>
          <h1>내 술창고</h1>
        </div>
        {memberId && (
          <div className="storage-write">
            <button className="storage-write-btn">
            <Link
              to={{
                pathname: '/ArchiveWriting',
                state: { memberId: memberId },
              }}
            >
              기록하기
            </Link>

            </button>
          </div>
        )}
        <div className="archive-main">
          {archives.map((archiveObj) => {
            const archive = archiveObj.archive;
            return (
              <div className="archive-container">
                <div className="archive-container">
                  <div className="archive-title">
                    <a href={`/archivesingle/${archive.arc_idx}`}>
                      <h2>{archive.arc_title}</h2>
                    </a>
                  </div>
                  <h4>{archive.mb_id}</h4>
                  <div className="archive-img-wrapper">
                    <img
                      className="archive-img"
                      src={`data:image/jpeg;base64,${archive.arc_file}`}
                      alt="archive-image"
                    />
                  </div>
        </div>
      </div>
            );
          })}
        </div>
      </div>

      <div className='Info_PaginationWrapper'>
      <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={itemsPerPage}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};


export default MyArchive;