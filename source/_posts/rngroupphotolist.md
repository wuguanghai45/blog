---
title: reactNative 相册分组的实现
date: 2017-07-20 22:58:06
tags:
- react-native
- react
- 相册
---

# React Native 相册分组的实现

React Native 没有现成的实现相册分组, qq群有人我这个问题。就尝试实现了一下。

- 首先先查看了React Native的相册接口 CameraRoll, 发现有得到相片的接口 getPhotos
- 然后查看接口的参数，筛选其中有用的。第一眼就注意到了groupTypes, 可惜的是groupTypes安卓版本不支持。自己手机试了一下发现android是会得到groupName。 然后查看了一下自己手机相册的分组， 发现手机相册的分组基本就是按照groupName来进行的。
- 那能不呢拿到所有图片数据然后遍历他们进行分组呢。
- 应该是可以的，有个first参数是可以设置方法拿出的相片数量。然后通过这个方法来拿到所有相片数据。。然后分组就简单了.

https://github.com/wuguanghai45/rnPhotoGroupDemo

源码如下

```javascript
import React, { Component } from 'react';
import { List } from "antd-mobile"; //用来antd mobile
import _ from "lodash";

import {
  CameraRoll,
} from 'react-native';

const Item = List.Item;
const Brief = Item.Brief;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      currCategory: null,
    };
  }

  componentDidMount() {
    this.getPhotoTypes();
  }

  getPhotoTypes = async() => {
    const data = await CameraRoll.getPhotos({ first: 10000}); //得到10000条相片
    const uniqTypesPics = _.groupBy(data.edges, (val) => {
      return val.node.group_name;
    }); // 根据他的group_name进行分组


    let categorys =_.keys(uniqTypesPics).map((key)=> {
      return {
        name: key,
        demoImage: uniqTypesPics[key][0].node.image,//拿到分组的第一张图片作为样例
        count: uniqTypesPics[key].length,//拿到分组的图片数量
      };
    })

    this.setState({
      categorys: categorys
    }); //对筛选的分组进行存储 因为是异步操作所以是不能直接得到值的。要先存到state里面
  }

  renderGroups = () => {
    return this.state.categorys.map((category)=> {
      return (
        <Item
          key={category.name}
          arrow="horizontal"
          multipleLine
          thumb={category.demoImage.uri}
          onClick={() => {
            this.setState({
              currCategory: category.name
            });
          }}
          platform="android"
          extra={category.count}
        >
            <Brief>{ category.name} </Brief>
        </Item>
      )
    });
  }

  handleModalBack = () => {
    this.setState({
      currCategory: null
    });
  }

  render() {
    return (
      <List className="my-list">
        {this.renderGroups()}
      </List>
    );
  }
}

export default App;

```
![效果](https://raw.githubusercontent.com/wuguanghai45/images/master/imageGroup.jpg)


## 待验证和讨论
- 一开始拿出10000张图是否有性能问题?(我认为应该不会有太大问题,
它应该是读取文件信息， 不是读取文件, 个人猜测)
- 是否有必要一定拿出所有的图片
- 是否有必要能成一个包













