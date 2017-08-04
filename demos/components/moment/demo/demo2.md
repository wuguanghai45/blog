---
order: 1
title:
  zh-CN: 时钟运行
  en-US: baseUse
---

## zh-CN

一个时钟运行demo

## en-US


````jsx
import React, { Component } from 'react';

class TimeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.timeRun = this.bindTimeInterval();
    this.setbackground();
  }

  componentWillUnmount() {
    clearInterval(this.timeRun);
  }

  setbackground = () => {
    const oNumber = this.number;
    const oDiv = oNumber.getElementsByTagName("div");
    const oSpan = oNumber.getElementsByTagName("span");
    for(var i=0; i < oDiv.length; i++){
      oDiv[i].style.WebkitTransform="rotate(" + i * 30 + "deg)";
    }
    for(var j=0; j < oSpan.length; j++){
      oSpan[j].style.WebkitTransform="rotate("+ j * -30 + "deg)";
    }
  }

  bindTimeInterval = () => {
    return setInterval(this.runColorNumber, 1000)
  }

  runColorNumber = () => {
    const nowTime=new Date();
    const nowHoure=nowTime.getHours();
    const nowMinute=nowTime.getMinutes();
    const nowSecond=nowTime.getSeconds();
    const houreDeg=(nowMinute/60)*30;
    const minuteDeg=(nowSecond/60)*6;
    this.setState({
      houreTransform: `rotate(${nowHoure * 30 + houreDeg}deg)`,
      minuteTransform: `rotate(${nowMinute * 6 + minuteDeg}deg)`,
      secondTransform: `rotate(${nowSecond * 6}deg)`,
    });
  }

  render() {
    return (
      <div className="time-demo">
        <div className="warp" >
          <div className="clock" >
              <div className="number" ref={ref=> this.number = ref}>
                <div><span>9</span></div>
                <div><span>10</span></div>
                <div><span>11</span></div>
                <div><span>12</span></div>
                <div><span>1</span></div>
                <div><span>2</span></div>
                <div><span>3</span></div>
                <div><span>4</span></div>
                <div><span>5</span></div>
                <div><span>6</span></div>
                <div><span>7</span></div>
                <div><span>8</span></div>
              </div>
              <div style={{transform: this.state.houreTransform}} className="houre pointer" ></div>
              <div style={{transform: this.state.minuteTransform}} className="minute pointer" ></div>
              <div style={{transform: this.state.secondTransform}} className="second pointer" ></div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return <TimeShow />;
  }
}

ReactDOM.render(
  <App />
, mountNode)
````


```css
.time-demo .warp {
  width: 230px;
  height: 230px;
  margin: 50px auto;
  box-sizing: initial;
}
.time-demo .clock {
  width: 200px;
  height: 200px;
  border-radius: 115px;
  border: 15px solid #f96;
  background: white;
  position: relative;
  box-sizing: initial;
  font-size: large;
}
.time-demo .number div {
  width: 190px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 90px;
}
.time-demo .number span {
  display: block;
  width: 20px;
  height: 20px;
}
.time-demo .pointer {
  position: absolute;
  bottom: 90px;
  transform-origin: 50% 90%;
  -webkit-transform-origin: 50% 90%;
}
.time-demo .houre {
  width: 5px;
  height: 60px;
  left: 98px;
  background: black;
}
.time-demo .minute {
  width: 3px;
  height: 70px;
  left: 99px;
  background: gray;
}
.time-demo .second {
  width: 1px;
  height: 80px;
  left: 100px;
  background: red;
}
```
