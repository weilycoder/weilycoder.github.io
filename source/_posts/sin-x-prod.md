---
title: Sin x 的无穷乘积表达
mathjax: true
date: 2025-07-20 13:03:32
categories:
  - Math
tags:
  - Calculus
  - Theorem
---

注意到：

$$
\boxed{
  \begin{aligned}
    \sin\left(3x\right) &= 3\sin\left(x\right)-4\sin^3\left(x\right) \\\\
    \sin\left(5x\right) &= 5\sin\left(x\right)-20\sin^3\left(x\right) + 16\sin^5\left(x\right) \\\\
    &\cdots
  \end{aligned}
}
$$

数学归纳容易证明

$$
\sin\left(\left(2n+1\right)x\right)=\sin x\cdot P\left(\sin^2\left(x\right)\right)
$$

这里 $P\left(x\right)$ 是关于 $x$ 的 $n$ 次多项式。

又因为

$$
\lim\_{x\to 0}\dfrac{\sin\left(\left(2n+1\right)x\right)}{\sin\left(x\right)}=2n+1
$$

因此 $[x^0]P\left(x\right)=2n+1$。

同时，$\sin\left(\left(2n+1\right)x\right)$ 的根为 $\dfrac{k\pi}{2n+1},k\in\mathbb{Z}$，因此 $\sin^2\left(\dfrac{k\pi}{2n+1}\right),k=1,2,\ldots,n$ 为 $P\left(x\right)$ 的 $n$ 个根，即

$$
\begin{aligned}
  P\left(x\right) &= \left(2n+1\right)\prod\_{k=1}^{n}\left(1-\dfrac{x}{\sin^{2}\left(\dfrac{k\pi}{2n+1}\right)}\right) \\\\
  \dfrac{\sin\left(\left(2n+1\right)x\right)}{\sin\left(x\right)} &= \left(2n+1\right)\prod\_{k=1}^{n}\left(1-\dfrac{\sin^2\left(x\right)}{\sin^{2}\left(\dfrac{k\pi}{2n+1}\right)}\right) \\\\
  \dfrac{\sin\left(\left(2n+1\right)x\right)}{\left(2n+1\right)\sin\left(x\right)} &= \prod\_{k=1}^{n}\left(1-\dfrac{\sin^2\left(x\right)}{\sin^{2}\left(\dfrac{k\pi}{2n+1}\right)}\right) \\\\
  \dfrac{\sin\left(x\right)}{\left(2n+1\right)\sin\left(\dfrac{x}{2n+1}\right)} &= \prod\_{k=1}^{n}\left(1-\dfrac{\sin^2\left(\dfrac{x}{2n+1}\right)}{\sin^{2}\left(\dfrac{k\pi}{2n+1}\right)}\right) \\\\
\end{aligned}
$$

令 $n\to\infty$，有

$$
\dfrac{\sin\left(x\right)}{x} = \prod\_{k=1}^{\infty}\left(1-\dfrac{x^2}{k^2\pi^2}\right)
$$