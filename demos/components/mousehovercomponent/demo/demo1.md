---
order: 0
title:
  zh-CN: 基本使用
  en-US: baseUse
---

## zh-CN

一个基础demo 鼠标悬浮显示红色， 离开显示蓝色

## en-US


````jsx

import React, { Component } from 'react';
import PropTypes from "prop-types";

class MouseChangeStyleWrap extends Component {
  static propTypes = {
    children: PropTypes.any,
    mouseOverStyle: PropTypes.object,
    mouseOutStyle: PropTypes.object,
    mouseOverClass: PropTypes.string,
    mouseOutClass: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    };
  }
  handleMouseOver = () => {
    this.setState({
      mouseOver: true
    });
  }
  handleMouseOut = () => {
    this.setState({
      mouseOver: false
    });
  }
  render() {
    const { mouseOutStyle, mouseOverStyle, mouseOverClass, mouseOutClass } = this.props;
    const { mouseOver } = this.state;
    return (
      <span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={mouseOver ? mouseOverStyle :  mouseOutStyle} className={mouseOver ? mouseOverClass : mouseOutClass }>
        {this.props.children}
      </span>
    );
  }
}


class App extends Component {
  render() {
    return (
      <MouseChangeStyleWrap mouseOverStyle={{color: "red"}} mouseOutStyle={{color: "blue"}}>
        鼠标悬浮红色，离开蓝色
      </MouseChangeStyleWrap>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode)
````
