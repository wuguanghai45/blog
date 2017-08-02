---
title: Docker 安装ss和ipec2VPN 科学上网
date: 2017-08-02 20:28:21
tags:
- docker
- 科学上网
---

# 首先要有台国外服务器

## 安装docker
- 根据自己的系统和官方文档安装docker
- 因为我是用的ubuntu 所以给的ubuntu的链接 请在左边菜单选择服务器版本
- https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
- docker版本有ce和ee ce版本是社区版免费的。。ee是企业版收费的, 我们需要安装的是ce版

## 安装shadowsock服务

- 链接 https://hub.docker.com/search/?isAutomated=0&isOfficial=0&page=1&pullCount=0&q=shadowsocks&starCount=0
- 上的是搜索链接， 右边是收藏数和下载量
- 上搜索链接是打算告诉大家很多应用和服务都能在dockerhub搜索到
- 正体链接 https://hub.docker.com/r/mritd/shadowsocks/ 文档已经非常清楚

### 不过还是打一下命令，更多详情信息请点击上面的链接，中文文档很是清晰
```
docker pull mritd/shadowsocks
docker run -dt --name ss -p 6443:6443 mritd/shadowsocks -s "-s 0.0.0.0 -p 6443 -m aes-256-cfb -k test123 --fast-open"
```

### 还可以使用kcptun
- https://github.com/xtaci/kcptun
- kcptun 是一个双向加速服务， 牺牲流量提升一些速度体验现在的ss一般都已经集成了
```
docker run -dt --name ss -p 6443:6443 -p 6500:6500/udp -e SS_CONFIG="-s 0.0.0.0 -p 6443 -m aes-256-cfb -k test123 --fast-open" -e KCP_CONFIG="-t 127.0.0.1:6443 -l :6500 -mode fast2" -e KCP_FLAG="true" mritd/shadowsocks
```

## 安装ipsec-vpn-server

- 链接 https://hub.docker.com/search/?isAutomated=0&isOfficial=0&page=1&pullCount=0&q=vpn&starCount=0
- 因为pptp已经被墙无法使用 所以选择 ipsec-vpn-server
- 正体链接 https://hub.docker.com/r/hwdsl2/ipsec-vpn-server/
- 中文文档链接 https://github.com/hwdsl2/docker-ipsec-vpn-server/blob/master/README-zh.md

# 最后感言
- 感觉自己没什么可写的官方教程很明白。。除了docker其他都有中文版
- docker 很强大很多人在上面发布过自己集成的docker以后有些应用打算用可以上dockerhub找
