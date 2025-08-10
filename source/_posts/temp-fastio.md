---
title: 快读快写模板 (Linux)
code_fold: -1
date: '2025-03-29T18:11:34.916702+08:00'
updated: '2025-03-30T10:23:02.158+08:00'
categories:
  - OI
  - template
tags:
  - io
---

这段模板是我刚接触 `mmap` 函数的时候写的，兼容性不高且不建议使用。

建议参考 {% post_link temp-fastio2 %}。

```cpp
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
using namespace std;

struct fast_io {
  size_t file_size;
#define MYBUF (1 << 24)
  char *rp, *wp;
  char pbuf[MYBUF], *pp = pbuf;
  fast_io() {
    struct stat sb;
    if (fstat(0, &sb) == -1)
      exit(1);
    file_size = sb.st_size;
    rp = (char *)mmap(nullptr, file_size, PROT_READ, MAP_PRIVATE, 0, 0);
  }
  ~fast_io() { munmap(rp, file_size), fwrite(pbuf, 1, pp - pbuf, stdout); }
  inline char gc() { return *rp++; }
  inline uint32_t rd() {
    uint32_t x = 0;
    char c = gc();
    while (c < '0' || c > '9')
      c = gc();
    for (; c >= '0' && c <= '9'; c = gc())
      x = x * 10 + (c ^ '0');
    return x;
  }
  inline void pc(const char &c) {
    if (pp - pbuf == MYBUF)
      fwrite(pbuf, 1, MYBUF, stdout), pp = pbuf;
    *pp++ = c;
  }
  inline void wt(uint32_t x) {
    static int sta[12];
    int top = 0;
    do {
      sta[top++] = x % 10, x /= 10;
    } while (x);
    while (top)
      pc(sta[--top] + '0');
  }
} io;

int main() {
  // Your Code
  return 0;
}
```
