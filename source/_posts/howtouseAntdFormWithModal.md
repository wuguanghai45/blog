---
title: 如何省心的使用Antd的Modal
date: 2017-07-21 14:14:51
tags:
- react
- antd
---

由于Antd的Modal的显示和隐藏是通过css实现的,
所以在和antd
Form结合的时候隐藏Form的时候整个Form组件其实还存在，并没有被mount掉,
然后就会出现如何把上次的状态撤销的问题，
再就会为了更新状态写一些代码来处理。 让整个Form组件变的非常凌乱


//antd 官网Modal
```javascript
  import { Modal, Button } from 'antd';

  class App extends React.Component {
    state = { visible: false }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, mountNode);
```

重构一下
```
  import { Modal, Button } from 'antd';

  class App extends React.Component {
    state = { visible: false }
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    renderModal = () => {
      if(this.state.visible) {
        <Modal
          title="Basic Modal"
          visible
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      }
    }

    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          {this.renderModal()}
        </div>
      );
    }
  }

  ReactDOM.render(<App />, mountNode);
```
这样只要visible是false那么Modal就会被mount掉， visible从false
变成true的话Modal会重新被render 而且会作为一个全新组件进行渲染，
没有以前遗留dom的污染


//将modal里面换成Form
```javascript
  if(this.state.visible) {
    <Modal
      title="Basic Modal"
      visible
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <Form record={this.state.reocrd}> {/*这里放一下自己写的子组件， 不限于Form*/}
    </Modal>
  }
```

如果有什么缺陷和bug的话， 欢迎朋友指正.
