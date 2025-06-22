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

本文大部分测试在 [24mail](http://24mail.chacuo.net/) 下进行；剩余测试均使用个人邮箱。

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

## `--from`

使用 `--from` 指定发件人的邮箱。

例如

```bash
swaks --to pewlkm93170@chacuo.net --from test@test.com
```

为了方便比较，这里直接列出本次输出和上一次输出的 `diff`：

```diff
  === Trying mx.chacuo.net:25...
  === Connected to mx.chacuo.net.
  <-  220 web1905 chcuo.net server 0.2
   -> EHLO LAPTOP-Q0JIQNAL.localdomain
  <-  250 web1905
-  -> MAIL FROM:<weily@LAPTOP-Q0JIQNAL.localdomain>
+  -> MAIL FROM:<test@test.com>
  <-  250 Ok
-  -> RCPT TO:<ewadub24516@chacuo.net>
?                ^^^^^^^ ^
+  -> RCPT TO:<pewlkm93170@chacuo.net>
?              +  ^^^^^ ^^
  <-  250 Ok
   -> DATA
  <-  354 End data with <CR><LF>.<CR><LF>
-  -> Date: Sun, 22 Jun 2025 00:32:48 +0800
?                            ^^  ^ ^^
+  -> Date: Sun, 22 Jun 2025 12:39:33 +0800
?                            ^^  ^ ^^
-  -> To: ewadub24516@chacuo.net
-  -> From: weily@LAPTOP-Q0JIQNAL.localdomain
+  -> To: pewlkm93170@chacuo.net
+  -> From: test@test.com
-  -> Subject: test Sun, 22 Jun 2025 00:32:48 +0800
?                                    ^^  ^ ^^
+  -> Subject: test Sun, 22 Jun 2025 12:39:33 +0800
?                                    ^^  ^ ^^
-  -> Message-Id: <20250622003248.009350@LAPTOP-Q0JIQNAL.localdomain>
?                          ^^ ^^^   ^^ ^
+  -> Message-Id: <20250622123933.001254@LAPTOP-Q0JIQNAL.localdomain>
?                          ^^ ^^^   ^^ ^
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

正规的邮箱服务里，一些域名会被检查 SPF 记录，如果发件 ip 与记录不符，无法通过验证，会被拒绝。例如：

```bash
swaks --to *********@qq.com --from admin@qq.com --ehlo qq.com
```

```text
=== Trying mx3.qq.com:25...
=== Connected to mx3.qq.com.
<-  220 newxmmxszc23-0.qq.com MX QQ Mail Server.
 -> EHLO qq.com
<-  250-newxmmxszc23-0.qq.com
<-  250-STARTTLS
<-  250-8BITMIME
<-  250-SMTPUTF8
<-  250-SIZE 73400320
<-  250 OK
 -> MAIL FROM:<admin@qq.com>
<** 550 SPF check failed. http://service.mail.qq.com/cgi-bin/help?subtype=1&&id=20022&&no=1001445 [MPdC3ariWK7GZndWaXfsa4eLTsQMO+LiHnoPqVrDu0UG6GBeQl5+eZOslGc9ekY1xQ== IP: 60.233.9.39]
 -> QUIT
*** Remote host closed connection unexpectedly.
```

这里的 ip 验证并非你的 ip 地址，而是你使用的 SMTP 服务器的地址。

顺带一提，Spamhaus 反垃圾邮件组织​​直接将 `swaks` 的默认邮箱服务的 ip 地址列入黑名单，而微软的 Outlook 邮箱会检查这一点：

```text
=== Trying outlook-com.olc.protection.outlook.com:25...
=== Connected to outlook-com.olc.protection.outlook.com.
<-  220 CH3PEPF00000015.mail.protection.outlook.com Microsoft ESMTP MAIL Service ready at Sun, 22 Jun 2025 05:58:00 +0000 [08DDB07650EC6878]
 -> EHLO test.com
<-  250-CH3PEPF00000015.mail.protection.outlook.com Hello [120.221.100.232]
<-  250-SIZE 49283072
<-  250-PIPELINING
<-  250-DSN
<-  250-ENHANCEDSTATUSCODES
<-  250-STARTTLS
<-  250-8BITMIME
<-  250-BINARYMIME
<-  250-CHUNKING
<-  250 SMTPUTF8
 -> MAIL FROM:<test@test.com>
<** 550 5.7.1 Service unavailable, Client host [120.221.100.232] blocked using Spamhaus. To request removal from this list see https://www.spamhaus.org/query/ip/120.221.100.232 (AS3130). [Name=Protocol Filter Agent][AGT=PFA][MxId=11BB60EC9FF1E732] [CH3PEPF00000015.namprd21.prod.outlook.com 2025-06-22T05:58:01.072Z 08DDB07650EC6878]
 -> QUIT
*** Remote host closed connection unexpectedly.
```

## `--ehlo`

使用 `--ehlo` 指定发送网址，用来进一步伪装。

例如

```bash
swaks --to pewlkm93170@chacuo.net --from test@test.com --ehlo test.com
```

`diff` 文件：

```diff
  === Trying mx.chacuo.net:25...
  === Connected to mx.chacuo.net.
  <-  220 web1905 chcuo.net server 0.2
-  -> EHLO LAPTOP-Q0JIQNAL.localdomain
+  -> EHLO test.com
  <-  250 web1905
   -> MAIL FROM:<test@test.com>
  <-  250 Ok
   -> RCPT TO:<pewlkm93170@chacuo.net>
  <-  250 Ok
   -> DATA
  <-  354 End data with <CR><LF>.<CR><LF>
-  -> Date: Sun, 22 Jun 2025 12:39:33 +0800
?                             ^  - ^^
+  -> Date: Sun, 22 Jun 2025 13:43:01 +0800
?                             ^ +  ^^
   -> To: pewlkm93170@chacuo.net
   -> From: test@test.com
-  -> Subject: test Sun, 22 Jun 2025 12:39:33 +0800
?                                     ^  - ^^
+  -> Subject: test Sun, 22 Jun 2025 13:43:01 +0800
?                                     ^ +  ^^
-  -> Message-Id: <20250622123933.001254@LAPTOP-Q0JIQNAL.localdomain>
?                           - ^ ^   ^^ ^
+  -> Message-Id: <20250622134301.004353@LAPTOP-Q0JIQNAL.localdomain>
?                            ^ ^^   ^^ ^
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

## `--head`

使用 `--head` 设置邮件头。

### Subject

例如，以下命令指定邮件标题为 `foo`：

```bash
swaks --to pewlkm93170@chacuo.net \
      --from test@test.com \
      --ehlo test.com \
      --head "Subject: foo"
```

```diff
  === Trying mx.chacuo.net:25...
  === Connected to mx.chacuo.net.
  <-  220 web1905 chcuo.net server 0.2
   -> EHLO test.com
  <-  250 web1905
   -> MAIL FROM:<test@test.com>
  <-  250 Ok
   -> RCPT TO:<pewlkm93170@chacuo.net>
  <-  250 Ok
   -> DATA
  <-  354 End data with <CR><LF>.<CR><LF>
-  -> Date: Sun, 22 Jun 2025 13:43:01 +0800
?                              ^^^^^^
+  -> Date: Sun, 22 Jun 2025 15:28:37 +0800
?                             +++++ ^
   -> To: pewlkm93170@chacuo.net
   -> From: test@test.com
-  -> Subject: test Sun, 22 Jun 2025 13:43:01 +0800
+  -> Subject: foo
-  -> Message-Id: <20250622134301.004353@LAPTOP-Q0JIQNAL.localdomain>
?                            ^^^^    ^^^
+  -> Message-Id: <20250622152837.008464@LAPTOP-Q0JIQNAL.localdomain>
?                           +++ ^   + ^^
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

也可以使用 `--h-Subject` 直接指定文件头部分的 `Subject` 项。

```bash
swaks --to pewlkm93170@chacuo.net \
      --from test@test.com \
      --ehlo test.com \
      --h-Subject "foo"
```

其他比较有用、swaks 未给出其他参数指定、且不会被转发覆盖的文件头字段是 `X-Mailer`、`X-Priority`、`Message-Id` 和 `cc`。

### X-Mailer

`X-Mailer` 用来标记发出邮件的应用程序，默认情况下是 `swaks <version> <url>`。

```bash
swaks --to pewlkm93170@chacuo.net \
      --from test@test.com \
      --ehlo test.com \
      --h-Subject "foo" \
      --h-X-Mailer "QQMail 2.x"
```

```diff
  === Trying mx.chacuo.net:25...
  === Connected to mx.chacuo.net.
  <-  220 web1905 chcuo.net server 0.2
   -> EHLO test.com
  <-  250 web1905
   -> MAIL FROM:<test@test.com>
  <-  250 Ok
   -> RCPT TO:<pewlkm93170@chacuo.net>
  <-  250 Ok
   -> DATA
  <-  354 End data with <CR><LF>.<CR><LF>
-  -> Date: Sun, 22 Jun 2025 15:28:37 +0800
?                                ^^^^
+  -> Date: Sun, 22 Jun 2025 15:39:20 +0800
?                               +++ ^
   -> To: pewlkm93170@chacuo.net
   -> From: test@test.com
   -> Subject: foo
-  -> Message-Id: <20250622152837.008464@LAPTOP-Q0JIQNAL.localdomain>
?                             ^^^    ^^^
+  -> Message-Id: <20250622153920.008982@LAPTOP-Q0JIQNAL.localdomain>
?                            ++ ^    ^^^
-  -> X-Mailer: swaks v20240103.0 jetmore.org/john/code/swaks/
+  -> X-Mailer: QQMail 2.x
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

### X-Priority

`X-Priority` 用来标记邮件的重要性。

- `X-Priority: 1`（或 `Urgent`）：最高优先级，表示紧急或非常重要的邮件。
- `X-Priority: 2`（或 `High`）：高优先级邮件。
- `X-Priority: 3`（或 `Normal`）：正常优先级邮件，这是默认级别。
- `X-Priority: 4`（或 `Low`）：低优先级邮件。
- `X-Priority: 5`（或 `Bulk`）：批量邮件或垃圾邮件，可能会被邮件客户端视为不太重要的邮件。

### Message-Id

用来给出一个唯一的邮件标识符。

一般来说，要求：

+ 首尾分别为 `<` 和 `>`；
+ 中间包含字符 `@`；
+ `@` 的左右均为由 `.` 分割的、非空可打印 ASCII 串。

一个满足上述要求的正则表达式如下：

```re
<[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*>
```

另外，`@` 的右侧通常为发件人的邮箱域名，例如：

+ `<d52ce63e-a0d5-4f95-b6a9-e1256a44f5fb@example.net>`
+ `<5ef31701.1c631ghz1.13943.bu15@example.net>`

### cc

`cc` 标记抄送人，但是只是让收信者看到你指定的抄送人，不会实际发送。
