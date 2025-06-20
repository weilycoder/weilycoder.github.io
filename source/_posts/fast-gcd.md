---
categories:
  - OI
title: 快速 GCD 算法
date: 2024-07-25 17:16:27
mathjax: true
tags:
  - template-code
  - math
---

> 例题：[Luogu P5435](https://www.luogu.com.cn/problem/P5435)

## 预处理 GCD

一种 $O(n)$ 预处理，$O(1)$ 查询两个小于 $n$ 的数的快速 $\gcd$。

### 引理

对于任意正整数 $n$，可以将 $n$ 写成 $n=abc$，满足 $a,b,c$ 任意一个小于 $\sqrt{n}$ 或为质数。

考虑归纳，首先对于 $1$，显然成立。

否则，设 $n$ 的最小质因子为 $p$，设 $\dfrac{n}{p}=xyz$ 是一个合法表示，不妨设 $x\le y\le z$。若 $x=1$，则 $n=pyz$ 是一个合法表示。不然有 $p\le x\le y\le z$，则 $p^4\le n$。若 $xp\gt\sqrt{n}$，有 $yp\gt\sqrt{n},zp\gt\sqrt{n}$，则 $xyzp^3\gt n^{3/2}$，矛盾，因此 $n=(xp)yz$ 是合法表示。

注意这个证明给出了合法表示的构造方法。

### 预处理

+ 预处理所有 $(i,j)$，其中 $i,j\le \sqrt{n}$ 的 $\gcd$。显然可以 $O(n)$ 推出来。
+ 预处理 $n$ 以内质数。

### 查询

计算 $\gcd(x,y)$。

设 $x=abc$，则：

$$
(x,y)=(a,y)\times\left(b,\dfrac{y}{(a,y)}\right)\times\left(c,\dfrac{y}{(ab,y)}\right)
$$

若 $a\in\mathbf{P}$，只需判断 $a$ 是否整除 $y$，否则 $(a,y)=(y\bmod a,a)$，因为 $a\le\sqrt{n}$，可以查表。

### 实现

```cpp
const int T = 1000;
const int M = 1000000;

int g[T][T], fac[M][3];
bitset<M> vis;
vector<int> pri;
void prework() {
  vis[0] = vis[1] = true;
  fac[1][0] = fac[1][1] = fac[1][2] = 1;
  for (int i = 2; i < M; ++i) {
    if (!vis[i]) {
      fac[i][0] = fac[i][1] = 1;
      fac[i][2] = i;
      pri.push_back(i);
    }
    for (int j : pri) {
      int mul = i * j;
      vis[mul] = true;
      fac[mul][0] = fac[i][0] * j;
      fac[mul][1] = fac[i][1];
      fac[mul][2] = fac[i][2];
      sort(fac[mul], fac[mul] + 3);
      if (i % j == 0)
        break;
    }
  }
  for (int i = 0; i < T; ++i)
    g[0][i] = g[i][0] = i;
  for (int i = 1; i < T; ++i)
    for (int j = 1; j <= i; ++j)
      g[i][j] = g[j][i] = g[j][i % j];
}
int gcd(int a, int b) {
  int ans = 1;
  for (int i = 0; i < 3; ++i) {
    int _ = fac[a][i] > T ? (b % fac[a][i] ? 1 : fac[a][i])
                          : g[fac[a][i]][b % fac[a][i]];
    b /= _;
    ans *= _;
  }
  return ans;
}
```

## 更相减损术

小常数 $O(\log n)$。

+ 若 $a=b$，$(a,b)=a=b$
+ 若 $2\mid a,2\mid b$，$(a,b)=\left(\dfrac{a}{2},\dfrac{b}{2}\right)$。
+ 若 $2\mid a,2\nmid b$（反之同理），$(a,b)=\left(\dfrac{a}{2},b\right)$。
+ 若以上均不满足，设 $a>b$，则 $(a,b)=(a-b,b)$。

```cpp
int gcd(int a, int b) {
  int i = __builtin_ctz(a);
  int j = __builtin_ctz(b);
  int k = min(i, j);
  int d;
  b >>= j;
  while (a) {
    a >>= i;
    d = b - a;
    i = __builtin_ctz(d);
    if (a < b) b = a;
    if (d < 0) a = -d;
    else a = d;
  }
  return b << k;
}
```
