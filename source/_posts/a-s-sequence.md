---
title: F(a, S) = 0 类数列通项
mathjax: true
date: 2025-06-20 14:48:06
categories:
  - Math
tags:
  - sequence
  - general-term
---

在数列通项的求解中，一类题目给定方程 $F\left(a, S\right)=0$（可能附加其他条件），求数列的通项。

通常，这类题目可以通过差分将 $S$ 消去，得到 $a$ 的递推关系（一般为一阶或二阶）；少部分将 $a$ 换为 $S$ 的差分，得到 $S$ 的递推关系。

本文收集一些有代表性的例题。

## Problem 1

{% note Problem open %}
有正向数列 $\left\\{a\_n\right\\}$，$S\_n$ 是其前 $n$ 项和，满足

$$
S\_n=\dfrac{1}{2}\left(a\_n+\dfrac{1}{a\_n}\right)
$$

求数列通项。
{% endnote %}

### 方法 1

注意到

$$
a\_n=\sqrt{n}-\sqrt{n-1}
$$

数学归纳易证。

### 方法 2

由 $S\_n,a\_n$ 关系，

$$
S\_{n+1}=\dfrac{1}{2}\left(S\_{n+1}-S\_{n}+\dfrac{1}{S\_{n+1}-S\_{n}}\right)
$$

整理得

$$
S\_{n+1}^2-S\_{n}^2=1
$$

又

$$
S\_1=a\_1=\dfrac{1}{2}\left(a\_1+\dfrac{1}{a\_1}\right)
$$

解得 $S\_1=a\_1=1$，则 $S\_1^2=1$。

因此，

$$
S\_n^2=n
$$

由于数列各项为正，

$$
S\_n=\sqrt{n}
$$

所以（$n\geqslant 2$ 时）

$$
a\_{n}=\sqrt{n}-\sqrt{n-1}
$$

检验发现 $n=1$ 时式子仍成立。
