---
title: 在线文档预览的实现使用docker unoconv
date: 2017-09-01 18:52:00
tags:
- docker
---

# 文档预览方案

## 因为最近开发的是一个文档管理系统， 感觉如果word文档没有预览的话会很不好用. 所以网上查了一些资料找了一些开源的东西， 试了一些方法.

## 各种方案(大致方向是打算写成一个webApp用docker调用)

### 用微软官方的word online
- 微软官方的word online, 可以先将word文档上传再打开。还支持编辑功能.
由于国内访问国外网速的问题。。放弃了.
- 可以自己搭建一个word online 的web app。必须使用window操作系统。
感觉window系统开销太大。。接着放弃.


### 用js转docx转html
mammoth 一个开源的docx转html 支持浏览器 https://github.com/mwilliamson/mammoth.js

试了一下，转出来的把很多格式去掉了。。感觉支持不大好.
样式要调整。。感觉不太靠谱。。放弃了

### 用java将docx转html

docx4j 一个java的文档转换开源项目, 可以写成html和pdf https://github.com/plutext/docx4j
因为不怎么火，文档也全是英文。没有现成的。
折腾了半天多。。因为没用过java.. 还要研究一下java的hello world 和tomcat 把文档转换写成一个java web app 对我很难
时间花费也多。。也就放弃了

### 百度文档服务

需要花钱。。最后如果折腾不出来我可能会选这种

### 各种第三方。。

买断制。。很贵

## 最后尝试找找命令行将docx转pdf或者html的工具 找到了unocov 然后有人还写了node版的web app 还用docker封装了放到docker hub 上面

https://hub.docker.com/r/zrrrzzt/docker-unoconv-webservice/

```
# 运行docker命令
docker run -d -p 80:3000 --name unoconv zrrrzzt/docker-unoconv-webservice

# 用curl传文件到服务器上输入docx 得到pdf
curl --form file=@myfile.docx http://localhost/unoconv/pdf > myfile.pdf
```

尝试一下后发现不支持中文。然后google了一下。。需要安装中文字体。

在Dockfile里面加了一句安装中文字体的代码
```
RUN apt-get -y install ttf-wqy-microhei
```

https://github.com/wuguanghai45/docker-unocnv-api

打包上传docker hub

### 因为我是基于docker开发应用所以在我的docker

```
  unoconv_webservice:
    image: wuguanghai45/docker-unocnv-api
    environment:
      - PAYLOAD_MAX_SIZE=104857600 //用来设置最大可接受文件
```


### 最后用rails写了一个方法用来处理文档转换。

- 先获取文档源文件, 因为用了七牛。所以先从七牛下载
- 然后传到文档转换服务器上进行转货，返回pdf
- 最后把pdf返回到浏览器上， google浏览器是可以打开在线pdf。(本来打算用pdf.js来显示，
但是项目目前不考虑兼容其他浏览器. 所以省下很多麻烦)

```
require 'open-uri'
require "pathname"
require 'rest-client'

class Unoconv
  attr_reader :attachment

  def initialize(attachment)
    @attachment = attachment
  end

  def get_content_path
    FileUtils.mkdir_p(root_path()) unless File.exists?(root_path())
    path = root_path(attachment.qiniu_key)
    if !File.exists?(path.sub_ext(".pdf"))
      download_and_save_content(path.sub_ext(attchment_extname))
    end

    path.sub_ext(".pdf")
  end

  def download_and_save_content(path)
    open(path, 'wb') do |file|
      file << open(attachment.download_url).read
    end

    if attchment_extname != ".pdf"
      response = RestClient.post('http://unoconv_webservice:3000/unoconv/pdf', :file => File.new(path))
      open(path.sub_ext(".pdf"), "wb") do |file|
        file << response.body
      end

      File.delete(path)
    end
  end

  def attchment_extname
    Pathname.new(attachment.origin_name).extname
  end

  def root_path(*arg)
    Pathname.new("/").join("tmp", "unoconv", *arg)
  end
end
```


