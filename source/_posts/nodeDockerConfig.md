---
title: 用Docker 打包封装简单的Node服务
date: 2017-07-29 11:30:18
tags:
- node
- docker
---

# 源码
https://github.com/wuguanghai45/weatherNodeApi

# 目的
为博客增加天气预报功能的准备工作

## 原因
看到有群友封装了一个Node的中央气象台的天气预报爬虫，https://github.com/bubao/nodc
打算弄成一个node服务给自己的博客添加天气预报。

## 为什么不直接用中央气象台的天气预报Api
浏览器无法解决跨域问题， 可能是中央气象台禁止跨域

## 为什么使用docker
因为不想弄服务器环境也不想搞部署


# 代码分析

## 文件结构
```
myApp
│   README.md
│   Dockerfile
│   docker-compose.yml
│
└───app
    │   app.js
    │   package.json
    │
    └───src
        │   city.json
        │   weather.js
        │   weatherSign.json
        node_modules
        │   ...
```

## Dockerfile
```go
FROM node:8.2.1-alpine
#从dockerhub 找的官方node 镜像 8.2.1是版本号 alpine好像是个迷你的基础环境 因为带这个后缀的包基本都很小

RUN mkdir /src

WORKDIR /src
ADD app/package.json /src/package.json
RUN cd /src && npm install --registry=https://registry.npm.taobao.org
#npm安装 并使用淘宝镜像 让国内安装的更快

RUN npm cache verify --force
#清除npm安装cache 不知道是不是没有正确的打开方式。。没发现打包后的镜像变小

EXPOSE 4000

CMD ["npm", "start"]

```

## docker-compose.yml

```
version: "2"

services:
  main:
    build: .
    volumes:
      - "./app:/src"
      - "/src/node_modules"
      #为了不用自己手动安装node_modules
      #这里要注意一下由于加了这个 本地目录会生成一个空的node_modules文件夹， 请不要删除
    ports:
    - "3030:4000"
```

# 最后献上正在运行的Api
阿里云的1M小水管自用 不知道什么时候会关
http://106.14.124.152:3030/?cityname=温州

