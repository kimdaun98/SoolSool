import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const Community = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

// 로그인 감지
useEffect(() => {
  checkLoginStatus();
}, []);

const checkLoginStatus = () => {
  axios
    .get('http://localhost:8099/soolsool/checkLoginStatus', { withCredentials: true })
    .then((response) => {
      setLoggedIn(response.data.loggedIn);
    })
    .catch((error) => console.error(error));
};


  // 페이징
  useEffect(() => {
    axios
      .get(`http://localhost:8099/soolsool/community?page=${page - 1}&size=${10}`)
      .then((response) => {
        setItems(response.data.map((data) => data.community));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const filteredItems = items.slice((page - 1) * 10, page * 10);

  // 내용에 p태그 없애는 부분 
  const stripHTMLTags = (content) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = content;
    return tmp.textContent || tmp.innerText || "";
  };


  

  return (
    <div className="community">
      <div className="community-header">
        <h1>커뮤니티</h1>
      </div>

      <div className="community-table-container">
         {/* 로그인 상태에 따라 글쓰기 버튼을 조건부로 표시합니다. */}
         {loggedIn && (
          <div className="table-row-header">
            <div>
              <button className="community-write">
                <Link to="/communityWriting">글작성</Link>
              </button>
            </div>
          </div>
        )}


        <hr className="community-hr" />

        {filteredItems.map((community, index) => (
         
          <div key={`community-post-${index}`} className="table-row">
            
            <div className="contents-idx">
              <span>{community.mb_id}</span>
              
            </div>
            
            <div className="table-row-contents">
            <Link
              to={`/CommunitySingle/${community.comm_idx}`}
              key={`community-post-${index}`}
              className="table-row-contents"
            >
              
              <h3>{community.comm_title}</h3>
              
            </Link>
              {/* <div className="contents-content">{stripHTMLTags(community.comm_content)}</div> */}
              
            </div>
            
            <div className="contents-img">
              <span>{community.comm_at}</span>
            </div>
            
          
          </div>
        ))}

        <hr className="community-hr" />

        <div className="Info_PaginationWrapper">
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={items.length}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;