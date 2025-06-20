---
title: 一类一阶递推数列的通项公式求法
mathjax: true
date: 2025-06-20 15:28:04
categories:
  - Math
tags:
  - sequence
---

本文讨论形如下式的递推数列通项，这里限定 $p\ne 0$。

$$
a\_{n+1}=pa\_{n}+f\left(n\right)
$$

## 通法

考虑在递推式两侧同时乘 $\dfrac{1}{p^{n+1}}$，于是递推式变为

$$
\dfrac{a\_{n+1}}{p^{n+1}}=\dfrac{a\_{n}}{p^{n}}+f\left(n\right)
$$

显然有

$$
\dfrac{a_{n+1}}{p^{n+1}}-\dfrac{a_1}{p}=\sum_{i=1}^{n}f(i)
$$

因此问题转化为 $f(n)$ 的前 $n$ 项和。

## 特解

*TODO*
