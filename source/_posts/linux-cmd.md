---
categories:
  - Linux
title: Linux 命令
date: 2025-05-17 14:01:12
update: "2025-06-01T22:53:48.139+0800"
---

随用随记。

## 获取机器所有用户

### 阅读 `/etc/passwd`

由于所有用户都保存在 `/etc/passwd` 文件中，因此可以使用

```bash
cut -d: -f1 /etc/passwd
```

+ `cut`：文本切割工具
+ `-d:`：以冒号 `:` 作为字段分隔符（`/etc/passwd` 文件的分隔符）
+ `-f1`：提取第一个字段（即用户名）
+ `/etc/passwd`：系统用户账户信息文件

### 过滤系统用户

由于系统用户的 uid 通常小于 1000，因此可以使用以下命令：

```bash
awk -F: '$3 >= 1000 {print $1}' /etc/passwd
```

## 创建用户

### 使用 `useradd`

```bash
sudo useradd -m <username>
```

+ `-m`：自动创建家目录；
+ `-s`：设置用户默认 `bash`，默认为 `/bin/sh`，但 `/bin/bash` 的界面更好看；也可以使用 `/sbin/nologin` 禁止登录；
+ `-G <group>`：将用户加入附加组，如加入 `sudu` 组赋予其 `root` 权限。

如果忘记使用 `-m`，则需要手动创建家目录。

```bash
sudo mkdir /home/<username>
sudo chown <username>:<username> /home/<username>
```

### 使用 `adduser`

```bash
sudo adduser <username>
```

此命令是交互式的。

### 检验用户创建成功

```bash
id <username>
ls /home
grep <username> /etc/passwd
```

## 更改密码

### 更改当前用户密码

直接使用

```bash
passwd
```

需要按提示输入旧密码，新密码，确认新密码。

### 更改其他用户密码

```bash
sudo passwd <usernname>
```

输入新密码，确认新密码。

### 其他操作

#### 强制用户修改密码

```bash
sudo passwd -expire <username>
```

#### 锁定/解锁用户账户

```bash
sudo passwd --lock <username>
sudo passwd --unlock <username>
```

### 密码文件

```bash
sudo nano /etc/shadow
```

保存用户密码的加盐哈希和一些其他设置。

## sudoers

### 加入 sudo 组

```bash
sudo usermod -aG sudo <username>
```

验证组是否存在：

```bash
grep sudo /etc/group
```

当然，可以通过修改 `/etc/group` 达成这一点。

### 编辑 `/etc/sudoers`

```bash
sudo visudo
```

在文件中添加以下行：

```text
<username> ALL=(ALL:ALL) ALL
```

保存退出后生效。

可以使用 `NOPASSWD` 取消 `sudo` 密码：

```text
<username> ALL=(ALL) NOPASSWD:ALL
```

### 验证权限

```bash
sudo -l -U <username>
```

## shell

### 查看可用 shell

```bash
cat /etc/shells
```

### 确定当前 shell

```bash
echo $SHELL  # 查看默认 Shell
echo $0      # 查看当前 Shell 类型
```

### 设置用户 shell

```bash
chsh -s /bin/bash
```

### 设置其他用户 shell

```bash
sudo usermod --shell <shell-path> <username>  # 方法 1
sudo chsh -s <shell-path> <username>          # 方法 2
```

也可以直接修改 `/etc/passwd` 的内容。

### 验证修改

```bash
grep <用户名> /etc/passwd  # 方法 1
getent passwd <用户名>     # 方法 2
```

## 删除用户

TODO
