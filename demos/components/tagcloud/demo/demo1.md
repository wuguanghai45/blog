---
order: 0
title:
  zh-CN: 第一个标签云demo
  en-US: TagCloud
---

## zh-CN

一个标签云demo
- [来源NPM](https://www.npmjs.com/package/TagCloud)
- [来源github](https://github.com/mcc108/tagcloud)
- [无修改源码](https://github.com/mcc108/tagcloud/blob/master/src/tagcloud/tagcloud.js)

我只是搬运了一下代码，仅仅一些小修改

## en-US


````jsx
import React, { Component } from 'react';
import PropTypes from "prop-types";

class TagCloud extends Component {
  static propsTypes = {
    style: PropTypes.object,
    fontSize: PropTypes.number,
    radius: PropTypes.number,
    direction: PropTypes.number,
    keep: PropTypes.bool,
    mspeed: PropTypes.string,
    ispeed: PropTypes.string,
  }
  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    clearInterval(this.up);
  }

  update = () => {
    let a, b;

    if (!this.active && !this.keep) {
      this.mouseX = Math.abs(this.mouseX - this.mouseX0) < 1 ? this.mouseX0 : (this.mouseX + this.mouseX0) / 2;   //重置鼠标与滚动圆心x轴距离
      this.mouseY = Math.abs(this.mouseY - this.mouseY0) < 1 ? this.mouseY0 : (this.mouseY + this.mouseY0) / 2;   //重置鼠标与滚动圆心y轴距离
    }

    a = -(Math.min(Math.max(-this.mouseY, -this.size), this.size) / this.radius ) * this.mspeed;
    b = (Math.min(Math.max(-this.mouseX, -this.size), this.size) / this.radius ) * this.mspeed;

    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
      return;
    }

    this.lasta = a;
    this.lastb = b;

    var sc = this._getSc(a, b);

    for (var j = 0, len = this.items.length; j < len; j++) {
      var rx1 = this.items[j].x,
        ry1 = this.items[j].y*sc[1] + this.items[j].z*(-sc[0]),
        rz1 = this.items[j].y*sc[0] + this.items[j].z*sc[1];

      var rx2 = rx1 * sc[3] + rz1 * sc[2],
        ry2 = ry1,
        rz2 = rz1 * sc[3] - rx1 * sc[2];

      var per = this.depth / (this.depth + rz2);

      this.items[j].x = rx2;
      this.items[j].y = ry2;
      this.items[j].z = rz2;
      this.items[j].scale = per; //取值范围0.6 ~ 3
      this.items[j].fontSize = Math.ceil(per * 3) + this.fontSize - 6;
      this.items[j].alpha = 1.5 * per - 0.5;

      this.items[j].element.style.left = this.items[j].x + (this.box.offsetWidth - this.items[j].offsetWidth) / 2 + "px";
      this.items[j].element.style.top = this.items[j].y + (this.box.offsetHeight - this.items[j].offsetHeight) / 2 + "px";
      this.items[j].element.style.fontSize = this.items[j].fontSize + "px";
      this.items[j].element.style.filter = "alpha(opacity=" + 100 * this.items[j].alpha + ")";
      this.items[j].element.style.opacity = this.items[j].alpha;
    }
  }

  _getIsSpeed = (ispeed) => {
    var speedMap = {
      slow: 10,
      normal: 25,
      fast: 50
    };
    return speedMap[ispeed] || 25;
  }

  _getItems = () => {
    let items = [];
    let element = this.box.children;
    let length = element.length;
    let item;

    for (var i = 0; i < length; i++) {
      item = {};
      item.angle = {};
      item.angle.phi = Math.acos(-1 + (2 * i + 1) / length);
      item.angle.theta = Math.sqrt((length + 1) * Math.PI) * item.angle.phi;
      item.element = element[i];
      item.offsetWidth = item.element.offsetWidth;
      item.offsetHeight = item.element.offsetHeight;
      item.x = this.radius * Math.cos(item.angle.theta) * Math.sin(item.angle.phi);
      item.y = this.radius * Math.sin(item.angle.theta) * Math.sin(item.angle.phi);
      item.z = this.radius * Math.cos(item.angle.phi);
      item.element.style.left = item.x + (this.box.offsetWidth - item.offsetWidth) / 2 + "px";
      item.element.style.top = item.y + (this.box.offsetHeight - item.offsetHeight) / 2 + "px";
      items.push(item);
    }

    return items;   //单元素数组
  }

  _getMsSpeed = (mspeed) => {
    var speedMap = {
      slow: 1.5,
      normal: 3,
      fast: 5
    };
    return speedMap[mspeed] || 3;
  }

  getConfig = () => {
    return {
      fontSize: 16,       //基本字体大小, 单位px
      radius: 60,         //滚动半径, 单位px
      mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
      ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
      direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
      keep: true,         //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
      ...this.props,
      element: this.wrap,
    }
  }

  _getSc = (a, b) => {
    var l = Math.PI / 180;
    //数组顺序0,1,2,3表示asin,acos,bsin,bcos
    return [
      Math.sin(a * l),
      Math.cos(a * l),
      Math.sin(b * l),
      Math.cos(b * l)
    ];
  }

  init = () => {
    const config = this.getConfig();
    this.config = config;
    this.fontSize = config.fontSize;
    this.radius = config.radius;
    this.depth = 1.5 * config.radius;
    this.size = 1.5 * config.radius;
    this.box = this.wrap;

    this.mspeed = this._getMsSpeed(config.mspeed);
    this.ispeed = this._getIsSpeed(config.ispeed);
    this.items = this._getItems();

    this.direction = config.direction;   //初始滚动方向
    this.keep = config.keep; //鼠标移出后是否保持之前滚动

    //初始化
    this.active = false;   //是否为激活状态
    this.lasta = 1;
    this.lastb = 1;
    this.mouseX0 = this.ispeed * Math.sin(this.direction * Math.PI / 180);    //鼠标与滚动圆心x轴初始距离
    this.mouseY0 = -this.ispeed * Math.cos(this.direction * Math.PI / 180);   //鼠标与滚动圆心y轴初始距离
    this.mouseX = this.mouseX0;   //鼠标与滚动圆心x轴距离
    this.mouseY = this.mouseY0;   //鼠标与滚动圆心y轴距离

    //定时更新
    this.update();    //初始更新
    this.box.style.visibility = "visible";
    this.box.style.position = "relative";
    this.box.style.minHeight = 2 * this.size + "px";
    this.box.style.minWidth = 2 * this.size + "px";
    for (var j = 0, len = this.items.length; j < len; j++) {
      this.items[j].element.style.position = "absolute";
      this.items[j].element.style.zIndex = j + 1;
    }
    this.up = setInterval(()=> {
      this.update();
    }, 30);
  }

  handleMouseOver = () => {
    this.active = true;
  }

  handleMouseOut = () => {
    this.active = false;
  }

  handleMouseMove = (ev) => {
    let boxPosition = this.box.getBoundingClientRect();
    this.mouseX = (ev.clientX - (boxPosition.left + this.box.offsetWidth / 2)) / 5;
    this.mouseY = (ev.clientY - (boxPosition.top + this.box.offsetHeight / 2)) / 5;
  }

  render() {
    return (
      <div style={this.props.style} ref={ref=>this.wrap=ref}
        className="tagcloud" onMouseOver={this.handleMouseOver}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}>
        {this.props.children}
      </div>
    );
  }
}

class App extends Component {
  handleClick = (text) => {
    alert(text);
  }
  render() {
    return (
      <TagCloud fontSize={30} radius={60} mspeed="fast" ispeed="fast" direction={200} keep={true}>
        <a onClick={this.handleClick.bind(this, "text1")}>text1</a>
        <a onClick={this.handleClick.bind(this, "text2")}>text2</a>
        <a onClick={this.handleClick.bind(this, "text3")}>text3</a>
        <a onClick={this.handleClick.bind(this, "text4")}>text4</a>
        <a onClick={this.handleClick.bind(this, "text5")}>text5</a>
        <a onClick={this.handleClick.bind(this, "text6")}>text6</a>
      </TagCloud>
    );
  }
}

ReactDOM.render(
  <App />
, mountNode)
````
