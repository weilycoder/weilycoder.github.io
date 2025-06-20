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

考虑在递推式两侧同时乘 $\dfrac{1}{p^{n}}$，于是递推式变为

$$
\dfrac{a\_{n+1}}{p^{n}}=\dfrac{a\_{n}}{p^{n-1}}+\dfrac{f\left(n\right)}{p^{n}}
$$

显然有

$$
\dfrac{a\_{n+1}}{p^{n}}-a\_1=\sum\_{i=1}^{n}\dfrac{f\left(i\right)}{p^{i}}
$$

因此问题转化为 $\left\\{\dfrac{f\left(n\right)}{p^{n}}\right\\}$ 的前 $n$ 项和。

$$
a\_{n+1}=\left(a\_1+\sum\_{i=1}^{n}\dfrac{f\left(i\right)}{p^{i}}\right)\cdot p^{n}
$$

## 特解

### f(n) = q

可以直接应用等比数列求和公式，但是存在另一种简洁的方法，参见 [一类分式递推数列的通项公式求法](/2025/05/31/frac-recursion/#A-p-0)。

### f(n) = q^n

此时有

$$
\dfrac{f\left(n\right)}{p^{n}}=\left(\dfrac{p}{q}\right)^{n}
$$

只需要应用等比数列求和公式即可。

### f(n) = qn

#### 方法 1

此时

$$
\dfrac{f\left(n\right)}{p^{n}}=\dfrac{qn}{p^{n}}
$$

这是一个“等差数列乘等比数列”的求和，可以参见 [有限微积分](/2025/05/26/finite-calculus/#等差数列乘等比数列)。

#### 方法 2

考虑递推式

$$
a\_{n+1}=pa\_{n}+qn
$$

待定系数

$$
\begin{aligned}
  a\_{n+1}-A\left(n+1\right) &= B\left(a\_{n}-An\right)+C \\\\
  a\_{n+1} &= Ba\_{n}+\left(A-AB\right)n+C+A \\\\
\end{aligned}
$$

因此

$$
\begin{cases}
  B &= p \\\\
  A-AB &= q \\\\
  A+C &= 0
\end{cases}
$$

现在 $\{a\_{n}-An\}$ 为常系数线性递推数列，求解方法在上文中提到过。
