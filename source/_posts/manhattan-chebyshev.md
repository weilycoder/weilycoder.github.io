---
title: 曼哈顿与切比雪夫距离互化
mathjax: true
date: 2025-02-16 22:10:00
updated: 2025-02-16 22:10:00
categories:
  - Math
tags:
  - distance
  - geometry
---

设 $n$ 维空间下 $A\left(a\_1,a\_2,a\_3,\dots,a\_n\right),B\left(b\_1,b\_2,b\_3,\dots,b\_n\right)$，则两点的曼哈顿距离为：

$$
\begin{aligned}
d\_M\left(A,B\right)
&= \sum\_{i=1}^{n}|a\_i-b\_i| \\\\
&= \sum\_{i=1}^{n}\max\left\\{a\_i-b\_i,b\_i-a\_i\right\\} \\\\
&= \max\_{S\subseteq \left\\{1,2,\dots n\right\\}}\left(\sum\_{i\in S}\left(a\_i-b\_i\right)-\sum\_{j\notin S}\left(a\_j-b\_j\right)\right) \\\\
&= \max\_{S\subseteq \left\\{2,3,\dots n\right\\}}\left|\left(a\_1-b\_1\right)+\sum\_{i\in S}\left(a\_i-b\_i\right)-\sum\_{j\notin S}\left(a\_j-b\_j\right)\right| \\\\
\end{aligned}
$$

显然，若将这个空间中的任意一点 $P\left(x\_1,x\_2,\dots,x\_n\right)$ 映射到 $2^{n-1}$ 维空间中的 $Q$ 点，其中 $Q$ 点每一维的坐标为

$$
x\_1+\sum\_{i\in S}x\_i-\sum\_{j\notin S}x\_j
$$

这里 $S$ 枚举 $\left\\{2,3,\dots,n\right\\}$ 的所有子集。

容易注意到，$n=1$ 或 $n=2$ 时，变换是特别的，具体来说，这恰好是 $2^{n-1}=n$ 的两个根。

然而，$n=1$ 时的变换是平凡的，因为这时两种距离没有区别。

我们考虑 $n=2$ 时的变换，若把二维平面上每一点 $P\left(x,y\right)$ 变换到 $Q\left(x+y,x-y\right)$，则前者的曼哈顿距离即为后者的切比雪夫距离。

同时，我们还注意到，这时变换是可逆的，具体来说，若将二维平面上每一点 $P\left(x,y\right)$ 变换到 $Q\left(\dfrac{x+y}{2},\dfrac{x-y}{2}\right)$，则前者的切比雪夫距离即为后者的曼哈顿距离。

遗憾的是，在更高维的空间，曼哈顿距离到切比雪夫距离的变换是不可逆的。

如果我们直接尝试变换切比雪夫距离到曼哈顿距离呢？

在二维，有

$$
\max\left\\{|a|,|b|\right\\}=\dfrac{|a+b|+|a-b|}{2}
$$

因此

$$
\begin{aligned}
d\_C\left(A,B\right)
&= \max\left\\{x\_1-x\_2,y\_1-y\_2\right\\} \\\\
&= \left|\dfrac{x\_1+y\_1}{2}-\dfrac{x\_2+y\_2}{2}\right|+\left|\dfrac{x\_1-y\_1}{2}-\dfrac{x\_2-y\_2}{2}\right| \\\\
&= d\_M\left(A^{\prime},B^{\prime}\right)
\end{aligned}
$$

但是，在更高维度，很难找到类似的形式。
