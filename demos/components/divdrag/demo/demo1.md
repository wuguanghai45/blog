---
order: 0
title:
  zh-CN: div拖动左右布局
  en-US: divDrag 
---

## zh-CN
有客户需要一个可以拖动的布局。。自己尝试写了一个

## en-US


````jsx
import React, { Component } from 'react';

const styles = {
  wrap: {
    width: 660, 
    height: 150,
    margin: "10px auto",
    position: "relative",
    clear: "both",
  },
  left: {
    flex: 1,
    background: "red",
    height: 150,
    display: "inline-block",
    minWidth: 10,
  },
  right: {
    flex: "1",
    background: "black",
    height: 150,
    display: "inline-block",
    minWidth: 10,
  },
  middle: {
    width: 5,
    background: "blue",
    height: 150,
    display: "inline-block",
    cursor: "e-resize",
  },
};

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
    };
  }

  componentDidMount = () => {
    document.onmousemove = this.onDocumentMouseMove;
    document.onmouseup = this.onDocumentMouseUp;
  }

  onLabelMousedown = (e) => {
    this.drag = true;
    this.downPageX = e.pageX;
    this.downOffsetWidth = this.label1.offsetWidth;
  }

  onDocumentMouseMove = (e) => {
    let width = this.downOffsetWidth;
    if(this.drag) {
      width = width + (e.pageX - this.downPageX);
      if (width === 0) width = -1;
      this.setState({
        width,
      });
    }
  }

  onDocumentMouseUp = () => {
    this.drag = false;
  }

  render() {
    return (
      <div>
        <div id='wrap' ref={ref => this.wrap = ref} style={{display: "flex"}}>
          <div ref={ref=> this.label1 = ref } style={{ ...styles.left, width: this.state.width, flex: this.state.width ? null : 1}} />
          <div onMouseDown={this.onLabelMousedown} style={styles.middle} />
          <div style={styles.right} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />
, mountNode)
````
