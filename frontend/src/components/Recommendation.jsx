import React, { useState } from 'react';
import axios from 'axios';
import '../css/Recommendation.css';

function Recommendation() {
  const [recommendation, setRecommendation] = useState(null);
  const [step, setStep] = useState(1);
  const [liq_type, setType] = useState('');
  const [degreemin, setdegreemin] = useState(0);
  const [degreemax, setdegreemax] = useState(0);
  const [acid, setAcid] = useState(0);
  const [sweet, setSweet] = useState(0);
  const [Smell, setSmell] = useState(0);
  const [Bitter, setBitter] = useState(0);
  const [body, setbody] = useState(0);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const calculateRange = (value) => {
    // 범위의 최소값 및 최대값을 계산합니다.
    const min = value;
    const max = value;
  
    // 결과의 범위 객체를 반환합니다.
    return { min, max };
  };
  
  const getServerData = async () => {
    // 각 값의 범위를 계산합니다.
    const sweetRange = calculateRange(sweet);
    const acidRange = calculateRange(acid);
    const aSmell = calculateRange(Smell);
    const aBitter = calculateRange(Bitter);

  
    const data = {
      liq_type : liq_type,
      liq_degree_min: degreemin,
      liq_degree_max: degreemax,
      liq_sweet_min: sweetRange.min,
      liq_sweet_max: sweetRange.max,
      liq_sour_min: acidRange.min,
      liq_sour_max: acidRange.max,
      liq_smell_min: aSmell.min,
      liq_smell_max: aSmell.max,
      liq_bitter_min: aBitter.min,
      liq_bitter_max: aBitter.max,
      liq_cacid_min: aBitter.max,
      liq_cacid_max: aBitter.max,
    };
    
  
    try {
      let response = await axios.get("http://localhost:8099/soolsool/Info/WithMultipleRanges", {
        params: data,
      });
  
      // 전통주 데이터가 반환되지 않을 경우, 도수 범위를 랜덤으로 설정하여 조회를 반복합니다.
      while (!response.data.length) {
        data.liq_degree_min = Math.floor(Math.random() * 30);
        data.liq_degree_max = Math.floor(Math.random() * (30 - data.liq_degree_min)) + data.liq_degree_min;
        
        response = await axios.get("http://localhost:8099/soolsool/Info/WithMultipleRanges", {
          params: data,
        });
      }
  
      const recommendedSoju = response.data[0];
      console.log(recommendedSoju);
  
      // 추천 전통주 상태를 업데이트합니다.
      setRecommendation(recommendedSoju);
    } catch (error) {
      console.error("Error while fetching recommendations:", error);
    }
    setStep(8);
  };

  return (
    <div className='Header-main'>
      <h1>전통주 추천</h1>
      {step === 1 && (
        <div> 
          <h2>어떤 주종을 마시고 싶으신가요?</h2>
          <div className='btn1'>
            <button onClick={() => { setType('탁주'); nextStep(); }}>탁주</button>
            <button onClick={() => { setType('약/청주'); nextStep(); }}>약청주</button>
            <button onClick={() => { setType('과실주'); nextStep(); }}>과실주</button>
            <button onClick={() => { setType('증류주'); nextStep(); }}>증류주</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>원하는 도수는 어느 정도 인가요?</h2>
          <div className='btn2'>
            <button onClick={() => { setdegreemax(9); setdegreemin(0); nextStep(); }}>0~9도</button>
            <button onClick={() => { setdegreemax(19); setdegreemin(10); nextStep(); }}>10~19도</button>
            <button onClick={() => { setdegreemax(29); setdegreemin(20); nextStep(); }}>20~29도</button>
            <button onClick={() => { setdegreemax(100); setdegreemin(30); nextStep(); }}>30도 이상</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 3 && liq_type !== '증류주' && (
        <div>
          <h2>탄산이 있는 술을 좋아하세요?</h2>
          <div className='btn3'>
            <button onClick={() => { setAcid(1); nextStep(); }}>네</button>
            <button onClick={() => { setAcid(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 3 && liq_type === '증류주' && (
        <div>
          <h2>달콤한 술을 좋아하세요?</h2>
          <div className='btn3'>
            <button onClick={() => { setSweet(1); nextStep(); }}>네</button>
            <button onClick={() => { setSweet(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 4 && liq_type !== '증류주' && (
        <div>
          <h2>새콤한 술을 좋아하세요?</h2>
          <div className='btn4'>
            <button onClick={() => { setAcid(2); nextStep(); }}>네</button>
            <button onClick={() => { setAcid(1); nextStep(); }}>보통</button>
            <button onClick={() => { setAcid(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 4 && liq_type === '증류주' && (
        <div>
          <h2>바디감이 있는 술을 좋아하세요?</h2>
          <div className='btn4'>
            <button onClick={() => { setSweet(2); nextStep(); }}>네</button>
            <button onClick={() => { setSweet(1); nextStep(); }}>보통</button>
            <button onClick={() => { setSweet(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 5 && liq_type !== '증류주' && (
        <div>
          <h2>바디감이 있는 술을 좋아하세요?</h2>
          <div className='btn5'>
            <button onClick={() => { setAcid(2); nextStep(); }}>네</button>
            <button onClick={() => { setAcid(1); nextStep(); }}>보통</button>
            <button onClick={() => { setAcid(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 5 && liq_type === '증류주' && (
        <div>
          <h2>입 안에 여운이 남는 술을 좋아하시나요?</h2>
          <div className='btn5'>
            <button onClick={() => { setSweet(2); nextStep(); }}>네</button>
            <button onClick={() => { setSweet(1); nextStep(); }}>보통</button>
            <button onClick={() => { setSweet(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 6 && liq_type !== '증류주' && (
        <div>
          <h2>향이 강한 술을 좋아하세요?</h2>
          <div className='btn6'>
            <button onClick={() => { setSmell(2); nextStep(); }}>네</button>
            <button onClick={() => { setSmell(1); nextStep(); }}>보통</button>
            <button onClick={() => { setSmell(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 6 && liq_type === '증류주' && (
        <div>
          <h2>쓴맛이 나는 술을 좋아하세요?</h2>
          <div className='btn6'>
            <button onClick={() => { setBitter(2); nextStep(); }}>네</button>
            <button onClick={() => { setBitter(1); nextStep(); }}>보통</button>
            <button onClick={() => { setBitter(0); nextStep(); }}>아니오</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <h2>완료! 결과를 확인하세요.</h2>
          <div className='result'>
            <button onClick={getServerData}>결과 확인</button>
            <button onClick={prevStep}>이전</button>
          </div>
        </div>
      )}

      {step === 8 && (
        <div className='rec-result'>
          {/* <h2>추천된 전통주</h2> */}
          {recommendation ? (
            <div>
              <div className='result-title'>{recommendation.liq_name}</div>
              
              <div className='result-type'>{recommendation.liq_type}</div>


              <img className='result-img' src={recommendation.liq_img} alt={recommendation.LIQ_NAME} />

              {/* 필요한 경우 추가 내용을 여기에 표시할 수 있습니다. */}
            </div>
          ) : (
            <div>매칭된 결과가 없습니다</div>
          )}
          <div className="result">
            <button onClick={() => setStep(1)}>다시 시작하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;