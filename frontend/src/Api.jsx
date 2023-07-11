import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/api.css';

const fetchNaverImage = async (query) => {
  const key = 'UZOpJVGGjYLXI4gEQrQQ';
  const key2 = 'htgZJF7IV8';

  try {
    const response = await axios.get('/api/v1/search/image', {
      params: {
        query: `"${query}"+"전통주"`,
      },
      headers: {
        'X-Naver-Client-Id': key,
        'X-Naver-Client-Secret': key2,
      },
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No image items returned');
    }

    return response.data.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });
};

const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState('');
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.odcloud.kr/api/15048755/v1/uddi:fec53d3a-2bef-4494-b50e-f4e566f403e0?page=1&perPage=100&serviceKey=365z9BgGCI9aGne60SSPOMbSm7aoguBVLVgMAjf0hbUvvyu96WEYRp%2Beoq5089GDxjInwexGiP56v2uGV4olvQ%3D%3D'
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getRandomImage = async (query) => {
    try {
      const items = await fetchNaverImage(query);
      const checkAndLoadImage = async (items) => {
        if (items.length === 0) {
          setImage('');
          return;
        }

        const randomIndex = Math.floor(Math.random() * items.length);
        const selectedItem = items[randomIndex];
        try {
          await loadImage(selectedItem.link);
          setImage(selectedItem.link);
        } catch (error) {
          console.warn('Invalid image', selectedItem);
          items.splice(randomIndex, 1);
          checkAndLoadImage(items);
        }
      };
      checkAndLoadImage(items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedData = data[randomIndex];

    setSelected(selectedData);
    await getRandomImage(selectedData.전통주명);
    setShowButton(false);
  };

  return (
    <div className="apibox">
      <div>{showButton && <button onClick={handleClick}>오늘의 전통주 선택</button>}</div>
      {selected && (
        <>
          <div>
            <h2 className="api_h2">오늘의 전통주</h2>
          </div>
          <div className="api_container">
            <div className="api_container_in2">
              {image ? (
                <img className="apiimg_box" src={image} alt="검색 결과 이미지" />
              ) : (
                <p>검색 결과 없음</p>
              )}

              <div className="api_container_in">
                <p>전통주명: {selected.전통주명}</p>
                <p>제조사: {selected.제조사}</p>
                <p>도수: {selected.도수}</p>
                <p>주원료: {selected.주원료}</p>
                <p>제조사: {selected.제조사}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
