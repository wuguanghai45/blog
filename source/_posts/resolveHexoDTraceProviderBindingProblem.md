---
title: 解决 DTraceProviderBindings 构建错误
date: 2017-07-26 20:19:50
tags:
- Hexo
---
每次运行的时候都会抛错虽然不影响使用但很烦心
```
Cannot find module './build/Release/DTraceProviderBindings'
```
google 了一下网上的教程大部分是重装

```
npm uninstall hexo
npm install hexo --no-optional
```

```
npm uninstall hexo-cli -g
npm install hexo-cli -g
```
虽然很多小伙伴纷纷表示有用。。重装了N遍然并软


那就有可能是环境问题造成打包出错
装一下xcode的工具， 然后重装一下python

```
xcode-select --install
brew install python
```

最后重装一下hexo

问题解决
