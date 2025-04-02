---
abbrlink: firefox
categories:
- - Misc
date: '2025-04-02T22:53:04.717225+08:00'
tags:
- Firefox
title: Firefox 高级设置
updated: '2025-04-02T23:02:56.874+08:00'
---
随用随记；欢迎补充。

## 账号验证

若使用国内服务器验证账号，需要手动更改几项设置：

```
identity.fxaccounts.autoconfig.uri: https://accounts.firefox.com.cn/
identity.fxaccounts.contextParam: fx_desktop_v3
identity.fxaccounts.oauth.enabled: false
```

## 位置设置

首先确保 `geo.enabled` 被设为 `true`。

然后可以将 `geo.provider.network.url` 设为其他服务器，或直接改为

```json
data:application/json,{"location":{"lng": _,"lat": _},"accuracy":27000.0}
```

`lng` 表示经度，`lat` 表示纬度。
