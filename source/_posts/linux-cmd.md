---
categories:
  - Linux
title: Linux 命令
date: 2025-05-17 14:01:12
---

随用随记。

## 获取机器所有用户

由于所有用户都保存在 `/etc/passwd` 文件中，因此可以使用

```bash
cut -d: -f1 /etc/passwd
```

+ `cut`：文本切割工具
+ `-d:`：以冒号 `:` 作为字段分隔符（`/etc/passwd` 文件的分隔符）
+ `-f1`：提取第一个字段（即用户名）
+ `/etc/passwd`：系统用户账户信息文件

这可能输出一堆用户名，但实际上很多是系统用户。

由于系统用户的 uid 通常小于 1000，因此可以使用以下命令：

```bash
awk -F: '$3 >= 1000 {print $1}' /etc/passwd
```

## 创建用户

使用 `useradd` 创建新用户。

```bash
sudo useradd -m <username>
```

+ `-m`：自动创建家目录；
+ `-s`：设置用户默认 `bash`，默认为 `/bin/sh`，但 `/bin/bash` 的界面更好看；也可以使用 `/sbin/nologin` 禁止登录；
+ `-G <group>`：将用户加入附加组，如加入 `sudu` 组赋予其 `root` 权限。

或者，使用 `adduser` 执行交互脚本。

```bash
sudo adduser <username>
```

检验用户创建成功：

```bash
id <username>
ls /home
grep <username> /etc/passwd
```

如果忘记使用 `-m`，则需要手动创建家目录。

```bash
sudo mkdir /home/<username>
sudo chown <username>:<username> /home/<username>
```
