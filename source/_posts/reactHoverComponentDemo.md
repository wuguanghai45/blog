---
title: React 实现鼠标hover的简单封装
date: 2017-07-26 18:45:04
tags:
- react
---

react 封装一个简单控件， 功能是更改鼠标hover的style或者class

```javascript
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

export default MouseChangeStyleWrap;
```

使用
```
<MouseChangeStyleWrap mouseOverStyle={{color: "red"}} mouseOutStyle={{color: "blue"}}>
  可以在这里用Component
</MouseChangeStyleWrap>
```

