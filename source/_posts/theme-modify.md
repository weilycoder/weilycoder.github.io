---
abbrlink: ''
categories:
- - project
date: '2025-03-30T09:14:27.577173+08:00'
tags:
- theme
title: Arknights Theme 修改日志
updated: '2025-03-30T09:14:27.486+08:00'
---
## 声明

作为一名合格（可能并不）的程序猿，我当然会对主题中部分不习惯的部分进行修改。但这毕竟不再完全是原作者的代码，因此我认为说明对哪些部分进行了修改是一件负责任的事情。
另外，原作者的项目使用了 MIT 许可证。

## 修改内容

### 404 页面

+ `themes\arknights\source\404.html`

修改标题为 `404 NOT FOUND`。

### 评论系统

+ `themes\arknights\layout\post.pug`

加入引用 `giscus` 的相关代码。

### 署名

+ `themes\arknights\layout\includes\aside.pug`
+ `themes\arknights\languages\en-us.yml`
+ `themes\arknights\languages\zh-cn.yml`

增加 `modified by`。
