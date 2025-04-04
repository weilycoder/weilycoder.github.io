---
categories:
- - project
date: '2025-03-30T09:14:27.577173+08:00'
tags:
- theme
title: Arknights Theme 修改日志
updated: '2025-04-04T18:49:51.771+08:00'
---
## 声明

作为一名合格（可能并不）的程序猿，我当然会对主题中部分不习惯的部分进行修改。但这毕竟不再完全是原作者的代码，因此我认为说明对哪些部分进行了修改是一件负责任的事情。
另外，原作者的项目使用了 MIT 许可证。

## 修改内容

### [`f9cea56`](https://github.com/weilycoder/weilycoder.github.io/commit/f9cea56da7e80c84404375826cb0855dd1807b93) 404 页面

+ `themes\arknights\source\404.html`

修改标题为 `404 NOT FOUND`。

### [`d2128cb`](https://github.com/weilycoder/weilycoder.github.io/commit/d2128cb160ac2a985966c31ed20e2280a04aaf0a) 评论系统

+ `themes\arknights\layout\post.pug`

加入引用 `giscus` 的相关代码。

### [`7290ec1`](https://github.com/weilycoder/weilycoder.github.io/commit/7290ec1ace22fb3f0b2aa0f4fc6a24595b12c5ff) 署名

+ `themes\arknights\layout\includes\aside.pug`
+ `themes\arknights\languages\en-us.yml`
+ `themes\arknights\languages\zh-cn.yml`

增加 `modified by`。

### [`d62b651`](https://github.com/weilycoder/weilycoder.github.io/commit/d62b651494e9baecdde5e9ed27fa09b28386f9bb) 颜色模式（ 适配 `giscus`）

+ `themes\arknights\source\js\_src\include\ColorMode.ts`

按照 [giscus 的教程](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)，增加了函数：

```typescript
function sendMessage<T>(message: T) {
  const iframe = document.getElementsByClassName("giscus-frame");
  if (iframe.length !== 1) return;
  const target = iframe[0];
  if (target instanceof HTMLIFrameElement) {
    target.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app');
  }
}
```

使用 `sendMessage({ setConfig: { theme: 'light_high_contrast' } });` 切换 giscus 到指定主题（示例中是 `light_high_contrast`）。

### [`250b190`](https://github.com/weilycoder/weilycoder.github.io/commit/250b1904229e23d86c266a1d223b5d3a4b589a17) 更改 giscus 的嵌入方式

+ `themes\arknights\layout\post.pug`

在启动时根据 `theme-mod` 的值自动选择合适的主题。

### [`9a788a3`](https://github.com/weilycoder/weilycoder.github.io/commit/9a788a38375cfef1f5f21431ce83a4f11b1bc895) 删除鼠标动画

+ `themes\arknights\source\js\_src\include\Cursors.ts`

注意改完后要用 `tsc` 重新编译。

### [`a677431`](https://github.com/weilycoder/weilycoder.github.io/commit/a67743110c0194ef14bc7972c5520194eec6be67) 实现 giscus 自动刷新

+ `themes\arknights\layout\post.pug`
+ `themes\arknights\source\js\_src\include\InitializeGiscus.ts`

网站的站内跳转使用 pjax 实现，默认不会执行更新后的页面中的 js 语句，因此考虑检测 pjax 的更新事件。

## Final

今后将修改同时上传 [hexo-theme-arknights (fork)](https://github.com/weilycoder/hexo-theme-arknights/)。

修改日志将在项目的自述文件中维护，不再同步。
