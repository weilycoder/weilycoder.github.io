---
title: 牛顿恒等式
mathjax: true
date: "2025-07-20T16:35:36.431+0800"
categories:
  - Math
tags:
  - Theorem
---

## 公式

设

$$
P\left(x\right)=\sum\_{k=0}^{n}a\_{k}x^{k}
$$

记 $P\left(x\right)$ 的根为 $\alpha\_{k},k=1,2,\ldots,n$，定义 $S\_{i}=\sum \alpha\_{k}^{i}$，并且令

$$
\begin{aligned}
  \sigma\_1 &= \sum\alpha\_{i} = -\dfrac{a\_{n-1}}{a\_{n}} \\\\
  \sigma\_2 &= \sum\alpha\_{i}\alpha\_{j} = \dfrac{a\_{n-2}}{a\_{n}} \\\\
  \sigma\_3 &= \sum\alpha\_{i}\alpha\_{j}\alpha\_{k} = -\dfrac{a\_{n-3}}{a\_{n}} \\\\
  &\vdots \\\\
  \sigma\_n &= \alpha\_{1}\alpha\_{2}\cdots\alpha\_{n} = \left(-1\right)^{n}\dfrac{a\_0}{a\_{n}}
\end{aligned}
$$

则有

$$
\begin{aligned}
  S_{0} &= n \\\\
  S_{1} &= 1\cdot\sigma_{1} \\\\
  S_{2} &= \sigma_{1}S_{1}-2\cdot\sigma_{2} \\\\
  S_{3} &= \sigma_{1}S_{2}-\sigma_{2}S_{1}+3\cdot\sigma_{3} \\\\
  &\vdots \\\\
  S_{n-1} &= \sigma_{1}S_{n-2}-\sigma_{2}S_{n-3}+\cdots+(-1)^{n-3}\sigma_{n-2}S_{1}+(-1)^{n-2}\cdot(n-1)\cdot\sigma_{n-1} \\\\
  &\vdots \\\\
  S_{m} &= \sum_{k=1}^{n}(-1)^{k+1}\sigma_{k}S_{m-k}
\end{aligned}
$$

*这里 $m\geqslant n$。*

更简洁地

$$
\boxed{
  S_{m} =
  \begin{cases}
    n, & m=0
    \\\\
    \begin{aligned}
    (-1)^{m+1}\cdot\sigma_{m}\cdot m+\sum_{k=1}^{m-1}(-1)^{m-1}\sigma_{k}S_{m-k}
    \end{aligned}, & 1\leqslant m\lt n
    \\\\
    \begin{aligned}
      \sum_{k=1}^{n}(-1)^{k+1}\sigma_{k}S_{m-k}
    \end{aligned}, & m\geqslant n
  \end{cases}
}
$$

***当 $n$ 为正无穷时，公式的第二行仍有意义。***
