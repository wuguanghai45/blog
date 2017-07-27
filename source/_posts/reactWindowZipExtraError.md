---
title: react-native run-android Exception in thread “main” java.util.zip.ZipException
date: 2017-07-22 13:48:56
tags:
- react native
---

抛解压错误， 是由于安装环境的时候下载了失败的压缩包造成

以2.4为例
删除文件
linux ~/.gradle/wrapper/dists/gradle-2.4-all/6r4uqcc6ovnq6ac6s0txzcpc0/gradle-2.4-all.zip
window "(用户目录)/.gradle/wrapper/dists/gradle-2.4-all/6r4uqcc6ovnq6ac6s0txzcpc0/gradle-2.4-all.zip"

下载新的包 https://services.gradle.org/distributions 并替换上面的文件(注意本机安装的版本)


