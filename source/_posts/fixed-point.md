---
title: 不动点法求解数列通项
categories:
  - Math
date: "2025-06-19T23:14:48.647+0800"
mathjax: true
tags:
  - fixed-point
---

## 方法简述

对于递推数列 $\left\\{a\_n\right\\}$，满足

$$
a\_{n+1}=f\left(a\_n\right)
$$

若存在 $\alpha$ 满足 $\alpha=f\left(\alpha\right)$，则

$$
a\_{n+1}-\alpha=f\left(a\_n\right)-\alpha
$$

上式会有比较好的性质。

{% note example open %}
例如，若

$$
a\_{n+1}=2a\_{n}+1
$$

由于 $x=2x+1$ 的解为 $-1$，在等式两侧同时减 $-1$：

$$
a\_{n+1}+1=2a\_{n}+1+1=2\left(a\_{n}+1\right)
$$

这里 $\left\\{a\_{n}+1\right\\}$ 为等比数列。
{% endnote %}

## 原理

对于不动点简化递推，这里引入两种解释：

### 解释 1

对于常见的递推式 $a\_{n+1}=f\left(a\_n\right)$，递推函数 $f\left(x\right)$ 一般为分式函数。不妨令 $f\left(x\right)=\dfrac{P\left(x\right)}{Q\left(x\right)}$，这里 $P\left(x\right)$ 和 $Q\left(x\right)$ 为多项式函数。

若 $f\left(x\right)$ 存在不动点 $\alpha$，即 $\alpha=f\left(\alpha\right)$，则 $g\left(x\right)=f\left(x\right)-\alpha$ 存在零点 $\alpha$，这意味着 $g\left(x\right)$ 必定存在因式 $x-\alpha$。

因此可以作换元 $b\_n=a\_n-\alpha$。

### 解释 2

首先，对于递推数列

$$
a\_{n+1}=f\left(a\_n\right)
$$

求其通项 $a\_n$ 的过程实际上就是在求 $f^{\left(n-1\right)}\left(x\right)$。

对于递推函数 $f\left(x\right)$，考虑作换元 $t=\psi\left(x\right)$，令 $g\left(t\right)$ 为 $t$ 的递推函数，则

$$
g\left(t\right)=\psi\left(f\left(\psi^{-1}\left(t\right)\right)\right)
$$

或者写作

$$
g=\psi\circ f\circ\psi^{-1}
$$

注意到

$$
g^{\left(n\right)}=\psi\circ f^{\left(n\right)}\circ\psi^{-1}
$$

这就是迭代在换元下的表达。

我们将 $f\left(x\right)$ 和 $g\left(x\right)$ 这种由换元联系起来的函数叫做**相似函数**。

对于函数 $f\left(x\right)$ 和 $g\left(x\right)$，若存在 $\psi\left(x\right)$ 及其反函数 $\psi^{-1}\left(x\right)$，使得 $g\left(x\right)=\psi\left(f\left(\psi^{-1}\left(x\right)\right)\right)$，就称 $f\left(x\right)$ 和 $g\left(x\right)$ 通过 $\psi\left(x\right)$ 相似，称 $\psi\left(x\right)$ 为桥函数，记作 $f\overset{\psi}{\sim}g$。

已经证明，若 $f\overset{\psi}{\sim}g$，则 $f^{\left(n\right)}\overset{\psi}{\sim}g^{\left(n\right)}$。

并且，若 $t\_0$ 为 $g\left(x\right)$ 的不动点，则 $t\_0=g\left(x\right)=\psi\left(f\left(\psi^{-1}\left(t\_0\right)\right)\right)$，即 $\psi^{-1}\left(t\_0\right)=f\left(\psi^{-1}\left(t\_0\right)\right)$，即 $x\_0=\psi^{-1}\left(t\_0\right)$ 为 $f\left(x\right)$ 的不动点，因此 $g\left(x\right)$ 的不动点与 $f\left(x\right)$ 的不动点一一对应。

由于相似函数之间紧密的联系，我们可以通过换元将一个函数转化为易于求解的相似函数。

而不动点正可以被利用构造简单的 $g\left(x\right)$。

不加定义地引入 $\pm\infty$ 及其运算，我们有 $f\left(x\right)=x+b$（等差型）的不动点为 $x\_0=\pm\infty$ 和 $f\left(x\right)=kx$（等比型）的不动点为 $x\_0=0,x\_1=\pm\infty$。

一般地，

+ 若函数 $f\left(x\right)$ 有一个不动点 $x\_0$，作换元 $t=\dfrac{1}{x-x\_0}$，则 $g\left(x\right)$ 的不动点为 $\pm\infty$，恰好为等差型的不动点；
+ 若函数 $f\left(x\right)$ 有两个不动点 $x\_0,x\_1$，作换元 $t=\dfrac{x-x\_0}{x-x\_1}$，则 $g\left(x\right)$ 的不动点为 $0,\pm\infty$，恰好为等比型的不动点。
