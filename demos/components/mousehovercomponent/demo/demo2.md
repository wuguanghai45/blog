---
order: 1
title:
  zh-CN: 多个数组的情况下使用
  en-US: multMapUse
---

## zh-CN

一个list里面使用的demo

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


const colors = [{
  mouseOver: "black",
  mouseOut: "red",
},{
  mouseOver: "pink",
  mouseOut: "orange",
},{
  mouseOver: "yellow",
  mouseOut: "green",
},{
  mouseOver: "blue",
  mouseOut: "purple",
}]

class App extends Component {
  renderMaps = () => {
    return colors.map((i, index) => {
      return (
        <div key={index}>
          <MouseChangeStyleWrap mouseOverStyle={{color: i.mouseOver}} mouseOutStyle={{color: i.mouseOut}}>
            鼠标悬浮{i.mouseOver}，离开{i.mouseOut}
          </MouseChangeStyleWrap>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {this.renderMaps()}
      </div>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode)
````
