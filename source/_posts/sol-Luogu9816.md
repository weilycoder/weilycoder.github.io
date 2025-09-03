---
title: Luogu 9816
mathjax: true
date: 2025-08-09 18:26:21
updated: 2025-08-09 18:26:21
categories:
  - OI
  - solution
tags:
  - math
  - binary-lifting
---

听说有个人差，但我觉得是倍增典题。

[题目链接](https://www.luogu.com.cn/problem/P9816)

> 给定多项式 $F\left(x\right)=\sum\_{k=1}^{m}a\_{k}x^{b\_k}$，记 $F\_{1}\left(x\right)=F\left(x\right)$，$F\_{n}\left(x\right)=F\left(F\_{n-1}\left(x\right)\right)$。
>
> $q$ 次询问，每次询问给出 $x\_j,y\_j$，求 $F\_{y\_j}\left(x\_j\right)\bmod p$ 的值。
>
> + $1\leqslant m\leqslant 20$；
> + $0\leqslant a\_i,b\_i\leqslant 10^{5}~\left(1\leqslant i\leqslant m\right)$；
> + $2\leqslant p\leqslant 10^{5}$，保证 $p$ 为质数；
> + $1\leqslant q\leqslant 3\times 10^{5}$；
> + $1\leqslant x\_j,y\_j\leqslant 10^{7}~\left(1\leqslant j\leqslant q\right)$。

<!-- more -->

---

注意到 $p,m$ 均较小，考虑将函数的映射表打出来。

使用一个倍增将 $F\_{2^{k}}\left(x\right)$ 的映射表也打出来。

显然有 $F\_{n+m}\left(x\right)=F\_{n}\left(F\_{m}\left(x\right)\right)$，因此单次查询时可以 $O\left(\log y\_{i}\right)$ 次把所求函数拼出来。

可以结合图上一些倍增手法或快速幂的倍增理解。
