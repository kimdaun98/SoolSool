import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const Archive = () => {
  const [page, setPage] = useState(1);
  const [archives, setArchives] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    checkLoginStatus();
  }, [memberId]);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8099/soolsool/checkLoginStatus",
        { withCredentials: true }
      );
      if (response.data.loggedIn) {
        setMemberId(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8099/soolsool/archive/page?page=${page - 1}&size=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.archives) {
          const totalCount = data.totalArchives;
          setTotalItems(totalCount);
  
          const currentPageItems = data.archives;
          setArchives(currentPageItems);
        } else {
          console.error("응답 데이터가 잘못된 형식입니다.", data);
          setArchives([]);
        }
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 오류가 발생했습니다.", error);
        setArchives([]);
      });
  }, [page, itemsPerPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="Storage">
        <div className="Storage_container">
          <h1>모두의 술창고</h1>
        </div>
        {memberId && (
          <div className="storage-write">
            <button className="storage-write-btn">
              <Link to="/ArchiveWriting">기록하기</Link>
            </button>
          </div>
        )}
        <div className="archive-main">
          {archives.map((archiveObj) => {
            const archive = archiveObj.archive;
            return (
              <div className="archive-container">
                  <div className="archive-title">
                    <a href={`/archivesingle/${archive.arc_idx}`}>
                      <h2>{archive.arc_title}</h2>
                    </a>
                  </div>
                  <div className="archive-member"><h4>{archive.mb_id}</h4></div>
                  <div className="archive-img-wrapper">
                    <img
                      className="archive-img"
                        src={`data:image/jpeg;base64,${archive.arc_file}`}
                      alt="archive-image"
                    />
                  </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Info_PaginationWrapper">
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

export default Archive;