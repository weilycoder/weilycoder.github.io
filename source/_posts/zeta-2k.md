---
title: 巴塞尔问题和 zeta(2k)
mathjax: true
date: "2025-07-20T20:43:39.684+0800"
categories:
tags:
  - Calculus
---

## zeta(2)（巴塞尔问题）

熟知 $\sin\left(x\right)$ 的无穷级数展开和{% post_link sin-x-prod '无穷乘积展开' %}：

$$
\begin{aligned}
  \sin\left(x\right)
  &= \sum\_{k=0}^{\infty}\dfrac{\left(-1\right)^{k}}{\left(2k+1\right)!}\cdot x^{2k+1} \\\\
  &= x-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\dfrac{x^7}{7!}+\dfrac{x^9}{9!}-\cdots \\\\
  \sin\left(x\right)
  &= x\cdot\prod\_{k=1}^{\infty}\left(1-\dfrac{x^2}{k^2\pi^2}\right) \\\\
  &= x\cdot\left(1-\dfrac{x^{2}}{\pi^2}\right)\cdot\left(1-\dfrac{x^{2}}{\left(2\pi\right)^{2}}\right)\cdot\left(1-\dfrac{x^{2}}{\left(3\pi\right)^{2}}\right)\cdots
\end{aligned}
$$

对比系数，有

$$
\left[x^{3}\right]\sin\left(x\right)=-\sum\_{k=1}^{\infty}\dfrac{1}{\left(k\pi\right)^{2}}=-\dfrac{1}{3!}
$$

因此

$$
\zeta\left(2\right)=\sum\_{k=1}^{\infty}\dfrac{1}{k^{2}}=\dfrac{\pi^2}{6}
$$

## zeta(4)

考虑 $\left[x^{5}\right]\sin\left(x\right)$，有

$$
\begin{aligned}
  \sum\_{x\lt y}\dfrac{1}{\left(x\pi\right)^2\left(y\pi\right)^2} &= \dfrac{1}{5!} \\\\
  \sum\_{x\lt y}\dfrac{1}{x^2y^2} &= \dfrac{\pi^4}{120}
\end{aligned}
$$

又已知 $\zeta\left(2\right)$，因此知道

$$
\zeta\left(2\right)^{2}=\sum\_{x,y}\dfrac{1}{x^2y^2}=\dfrac{\pi^4}{36}
$$

因此

$$
\begin{aligned}
  \zeta\left(4\right)
  &= \sum\_{k=1}^{\infty}\dfrac{1}{k^4} \\\\
  &= \left(\sum\_{x,y}\dfrac{1}{x^2y^2}\right)-2\cdot\left(\sum\_{x\lt y}\dfrac{1}{x^2y^2}\right) \\\\
  &= \dfrac{\pi^4}{36}-2\cdot\dfrac{\pi^4}{120} \\\\
  &= \dfrac{\pi^4}{90}
\end{aligned}
$$

## zeta(2k)

直接将{% post_link newtons-identities '牛顿恒等式' %}作用到无穷求和上，有

$$
\boxed{
  \dfrac{\zeta\left(2k\right)}{\pi^{2k}}=\dfrac{\left(-1\right)^{k+1}\cdot k}{\left(2k+1\right)!}+\sum\_{i=1}^{k-1}\dfrac{\left(-1\right)^{i+1}}{\left(2i+1\right)!}\cdot\dfrac{\zeta\left(2\left(k-i\right)\right)}{\pi^{2\left(k-i\right)}}
}
$$

这个递推可以使用[伯努利数](https://oi-wiki.org/math/combinatorics/bernoulli/)写出封闭形式

$$
\boxed{
  \zeta(2k)=-\dfrac{B_{2k}\cdot(2\pi i)^{2k}}{2\cdot(2k)!}
}
$$

我对伯努利数不太熟悉，这里不证了。
