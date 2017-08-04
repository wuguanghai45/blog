---
order: 0
title:
  zh-CN: 基本使用
  en-US: baseUse
---

## zh-CN

一个时间运行demo

## en-US


````jsx
import React, { Component } from 'react';
import PropTypes from "prop-types";

class TimeShow extends Component {
  static PropTypes = {
    styles: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      timeString: this.getTimeString(),
    };
  }

  componentDidMount() {
    this.timeRun = this.bindTimeInterval();
  }

  componentWillUnmount() {
    clearInterval(this.timeRun);
  }

  bindTimeInterval = () => {
    return setInterval(()=> {
      this.setState({
        timeString: this.getTimeString()
      });
    }, 1000)
  }

  getTimeString = () => {
    let date = new Date()
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    const m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    const s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
  }

  render() {
    return (
      <span style={this.props.style}>
        {this.state.timeString}
      </span>
    );
  }
}

class App extends Component {
  render() {
    return <TimeShow style={{color: "blue"}} />;
  }
}

ReactDOM.render(
  <App />
, mountNode)
````
