import React, { Component } from "react";

class SpeedTest extends Component {
  state = {
    state: "waiting",
    message: "Click to Start",
    result: [],
  };

  // state를 사용한다면 재렌더링 되기 때문에,
  //렌더링하고 싶지 않는 부분은 따로 위에 변수로 빼줌
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "On Green, Click the Screen",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "CLICK NOW!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 정도 랜덤 시간
    } else if (state === "ready") {
      //성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: "waiting",
        message: "Oops. Too Fast! Wait for the Green Screen.",
      });
    } else if (state === "now") {
      //반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "Click to Start",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  renderAverage = () => {
    return this.state.result.length === 0 ? null : (
      <div>
        평균 시간:
        {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms
      </div>
    );
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default SpeedTest;
