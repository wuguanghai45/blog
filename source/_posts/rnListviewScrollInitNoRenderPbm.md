---
title: ListView 初次加载空白 scroll后显示问题
date: 2017-07-25 23:39:33
tags:
- react
- react native
---

- ListView 用scroll的时候，初次加载空白，scroll之后才会显示。
- 以前做项目的时候遇到过，解决方案react native的issue里面有提.
- 今天有群友遇到了，就尝试找了一下解决方法, 找到解决方案
- 来源issue https://github.com/facebook/react-native/issues/1831

有很多外国用户解决过这个问题

方案一:
  禁用性能优化 设置ListView removeClippedSubviews={false}
  - 这样做因为禁用了性能优化，可能会造成一些性能问题


方案二:
  用代码滑动一下  选了一个比较详细的例子
  ```javascript
  class ...YourListAbstraction {

    _scrollY = 0;
    _lastTimeScrolled = 0;

    scrollHackToWorkaroundWhiteBug (amount) { // call at appropriated time, with -1 or 1. if possible alternate so you don't change the actual scroll over calls xD
      const { list } = this.refs;
      if (!list) return;
      if (Date.now() - this._lastTimeScrolled < 500) return; // don't mess with user scroll
      list.getScrollResponder().scrollTo({
        y: this._scrollY + amount,
      });
    }

    onScroll = ({ nativeEvent }) => { // give onScroll={this.onScroll} to ListView
      this._scrollY = nativeEvent.contentOffset.y;
      this._lastTimeScrolled = Date.now();
    };

  }
  ```

  - 可能比方案一好一点，具体情况未测试，拿了老外的issue.


