---
title: 快读快写模板 2
code_fold: -1
date: 2025-08-10 19:35:28
updated: 2025-08-10 19:35:28
categories:
  - OI
  - template
tags:
  - io
---

{% post_link temp-fastio %} 是我刚接触 mmap 函数的时候写的，兼容性不高且不建议使用。

对于这篇模板，请注意 `FastIO` 的大小为 `BufSize` 的 2 倍左右，可能不适合在局部声明，建议全局声明为静态变量。

```cpp
#include <cstdint>
#include <cstdio>

template <size_t BufSize = 1 << 20> struct FastIO {
  char buf[BufSize], *p1, *p2;
  char pbuf[BufSize], *pp = pbuf;
  FastIO() = default;
  FastIO(const FastIO &) = delete;
  FastIO &operator=(const FastIO &) = delete;
  ~FastIO() { fwrite(pbuf, 1, pp - pbuf, stdout); }
  inline char gc() {
    return p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, BufSize, stdin), p1 == p2)
               ? EOF
               : *p1++;
  }
  inline int64_t rd() {
    int64_t x = 0;
    char c = gc();
    while (c < '0' || c > '9')
      c = gc();
    for (; c >= '0' && c <= '9'; c = gc())
      x = x * 10 + (c ^ '0');
    return x;
  }
  inline void pc(const char c) {
    if (pp - pbuf == BufSize)
      fwrite(pbuf, 1, BufSize, stdout), pp = pbuf;
    *pp++ = c;
  }
  inline void wt(int64_t x) {
    static int sta[35];
    int top = 0;
    do
      sta[top++] = x % 10, x /= 10;
    while (x);
    while (top)
      pc(sta[--top] + '0');
  }
  inline void wt(const char *s) {
    while (*s)
      pc(*s++);
  }
  FastIO &operator<<(const char c) { return pc(c), *this; }
  FastIO &operator<<(const int64_t x) { return wt(x), *this; }
  FastIO &operator<<(const char *s) { return wt(s), *this; }
  FastIO &operator>>(char &c) { return c = gc(), *this; }
  FastIO &operator>>(int64_t &x) { return x = rd(), *this; }
};
```