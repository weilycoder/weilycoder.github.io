---
title: Swaks 发送邮件
code_fold: -1
date: 2025-06-22 00:26:38
categories:
  - CTF
tags:
  - tools
---

列举常用的 `swaks` 参数，随用随记。

## 临时邮箱

本文所有测试在 [24mail](http://24mail.chacuo.net/) 下进行。

## 下载

（Ubuntu）使用以下代码下载 `swaks`：

```bash
sudo apt install swaks
```

## `--to`

使用 `--to` 指定目标邮箱。例如

```bash
swaks --to ewadub24516@chacuo.net
```

你大概会看到类似这样的日志

```text
=== Trying mx.chacuo.net:25...
=== Connected to mx.chacuo.net.
<-  220 web1905 chcuo.net server 0.2
 -> EHLO LAPTOP-Q0JIQNAL.localdomain
<-  250 web1905
 -> MAIL FROM:<weily@LAPTOP-Q0JIQNAL.localdomain>
<-  250 Ok
 -> RCPT TO:<ewadub24516@chacuo.net>
<-  250 Ok
 -> DATA
<-  354 End data with <CR><LF>.<CR><LF>
 -> Date: Sun, 22 Jun 2025 00:32:48 +0800
 -> To: ewadub24516@chacuo.net
 -> From: weily@LAPTOP-Q0JIQNAL.localdomain
 -> Subject: test Sun, 22 Jun 2025 00:32:48 +0800
 -> Message-Id: <20250622003248.009350@LAPTOP-Q0JIQNAL.localdomain>
 -> X-Mailer: swaks v20240103.0 jetmore.org/john/code/swaks/
 ->
 -> This is a test mailing
 ->
 ->
 -> .
<-  250 Ok
 -> QUIT
<-  221 Bye
=== Connection closed with remote host.
```

顺便，这里列出每行的三个前缀字符的含义：

| 提示符 | 含义                                     |
| :----: | ---------------------------------------- |
| `===`  | 表示Swaks生成的信息行                    |
| `***`  | 表示Swaks内部产生的错误                  |
| ` ->`  | 表示Swaks向目标服务器发送的预期行        |
| ` ~>`  | 表示Swaks向目标服务器发送的TLS加密预期行 |
| `**>`  | 表示Swaks向目标服务器发送的意外行        |
| `*~>`  | 表示Swaks向目标服务器发送的TLS加密意外行 |
| `<- `  | 表示目标服务器向Swaks发送的预期行        |
| `<~ `  | 表示目标服务器向Swaks发送的TLS加密预期行 |
| `<**`  | 表示目标服务器向Swaks发送的意外行        |
| `<~*`  | 表示目标服务器向Swaks发送的TLS加密意外行 |

这种情形下，通常 `From` 字段被标记为 `<用户>@<机器>` 的形式；`Subject` 被标记为 `test <时间>`；`X-Mailer` 被标记为 `swaks` 的名称和版本；正文部分为 `This is a test mailing`。
