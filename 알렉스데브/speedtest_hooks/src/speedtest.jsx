import React, { useState, useRef } from "react";

const SpeedTest = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("Click to Start");
  const [result, setResult] = useState([]);

  // DOM에 직접 접근하거나, this의 속성을 표현할 때 ref를 사용한다.
  // state 와 ref의 차이: setState로 상태값을 변경하면 하단 렌더링 return 부분이 다시 실행되나, ref의 값을 바꾸면 다시 rendering 되지 않음.
  // 불필요한 렌더링을 막아 성능저하를 방지하기 위해 사용한다. (값이 바뀌지만 화면에 영향을 미치고 싶지 않을 때)
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  // div 화면 렌더링 부분
  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("If On Green, Click the Screen!");
      // ref의 경우 current로 접근한다.
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("CLICK NOW!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 정도 랜덤 시간
    } else if (state === "ready") {
      //성급하게 클릭
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage("Oops. Too Fast! Wait for the Green Screen.");
    } else if (state === "now") {
      //반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setMessage("Click to Start");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          Avg. Time:
          {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onReset}>Reset Result</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default SpeedTest;
