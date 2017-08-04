---
order: 0
title:
  zh-CN: 3Dhover
  en-US: 3Dhover
---

## zh-CN

一个3d hover 网上找的效果写成React
效果来自 https://zhuanlan.zhihu.com/p/24177270

## en-US


````jsx

import React, { Component } from 'react';
import PropTypes from "prop-types";

const styles = {
  text: {
    width: "100%",
    height: 500,
    background: "white",
    padding: "100px 0",
    margin: "0 auto",
    border: "1px solid #ddd",
    perspective: "500px",
  },
  banner: {
    height: 300,
    width: 400,
    margin: "0 auto",
    background:  "#37D7B2",
    transition: "transform 0.1s",
    boxShadow: "0 0 15px rgba(0,0,0,0.25)",
    textAlign: "center",
    lineHeight: "300px",
    fontSize: 50,
    color: "#fff",
  }
}

class Mouse3DHover extends Component {
  static propTypes = {
    children: PropTypes.any,
    contentStyles: PropTypes.object,
    wrapStyles: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      transform: "",
    };
  }

  handleMouseMove = (e) => {
    const textDom = this.text;


    const rect = textDom.getClientRects()[0];
    let x = e.pageX - rect.left - window.scrollX;
    let y = e.pageY - rect.top - window.scrollY;

    let centerX = textDom.offsetWidth / 2;
    let centerY = textDom.offsetHeight / 2;

    let deltaX = x - centerX;
    let deltaY = y - centerY;

    let percentX = deltaX / centerX
    let percentY = deltaY / centerY

    let deg = 10

    this.setState({
      transform: `rotateX(${ deg*-percentY }deg) rotateY(${ deg*percentX }deg)`,
    });
  }

  handleMouseLeave = () => {
    this.setState({
      transform: ""
    });
  }

  render() {
    return (
      <div id="test" ref={ref => this.text=ref} onMouseMove={this.handleMouseMove} style={{ ...styles.text, ...styles.wrapStyles }} onMouseLeave={this.handleMouseLeave} >
        <div style={{...styles.banner, ...this.props.contentStyles, transform: this.state.transform}}>{this.props.children}</div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Mouse3DHover >
        这个是3Dhover
      </Mouse3DHover>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode)
````
